(function () {
    "use strict";


    /**
     *
     * KlekiProjectObj {
     *     width: int,
     *     height: int,
     *     layers: {
     *        name: string,
     *        opacity: float (0 - 1),
     *        mixModeStr: string,
     *        image: image object                <--------- image already loaded!
     *     }[]
     * }
     *
     * @param p_w int - width of UI
     * @param p_h int - height of UI
     * @param p_klekiProjectObj KlekiProjectObj|null - project you want kleki to start with. null -> empty canvas
     * @returns {HTMLDivElement}
     * @constructor
     */
    function PCWeb(p_w, p_h, p_klekiProjectObj) {
        // default 2048, unless your screen is bigger than that (that computer then probably has the horsepower for that)
        // but not larger than 4096 - a fairly arbitrary decision
        var klekiMaxCanvasSize = Math.min(4096, Math.max(2048, Math.max(window.screen.width, window.screen.height)));
        let collapseThreshold = 820;
        let uiState = 'right';// 'left' | 'right'
        var e = [];
        //private Element
        //containing methods etc
        var pEl = {
            fillLayer: function (ctx) {
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, pcCanvas.width, pcCanvas.height);
            }
        };
        var div = document.createElement("div");
        div.className = 'g-root';
        var width = Math.max(0, p_w);
        var height = Math.max(0, p_h);
        var toolwidth = 271;
        var exportPNG = true;
        var exportType = 'png'; // png | layers | psd (| layers-zip | webp | jpg)
        var pcCanvas = new BV.PcCanvas(
            p_klekiProjectObj ? {
                projectObj: p_klekiProjectObj
            } : {
                width: Math.min(klekiMaxCanvasSize, window.innerWidth < collapseThreshold ? width : width - toolwidth),
                height: Math.min(klekiMaxCanvasSize, height)
            });
        pcCanvas.setLogger(BV.pcLog);
        var initState = {};

        if (p_klekiProjectObj) {
            setTimeout(function() {
                output.out('Restored from Browser Storage');
            }, 100);
        }

        function translateSmoothing(s) {
            if(s == 1) {
                return 1 - 0.5;
            }
            if(s == 2) {
                return 1 - 0.16;
            }
            if(s == 3) {
                return 1 - 0.035;
            }
            if(s == 4) {
                return 1 - 0.0175;
            }
            if(s == 5) {
                return 1 - 0.00875;
            }
            return s;
        }

        function isUploadAllowed() {
            return 0 < BV.pcLog.getState();
        }

        let isFirstImage = true;
        function isFirstUntouchedImage() {
            return isFirstImage && 0 === BV.pcLog.getState();
        }

        if(p_klekiProjectObj) {
            p_klekiProjectObj = null;
        } else {
            BV.pcLog.pause();
            pcCanvas.addLayer();
            pEl.fillLayer(pcCanvas.getLayerContext(0));
            BV.pcLog.pause(false);
        }
        initState = {
            canvas: new BV.PcCanvas({copy: pcCanvas}),
            focus: pcCanvas.getLayerCount() - 1
        };

        initState.initBrushes = function () {
            initState.brushes = {};
            for (var b in BV.BrushLib) {
                if (BV.BrushLib.hasOwnProperty(b)) {
                    initState.brushes[b] = new BV.BrushLib[b]();
                    if (initState.canvas) {
                        initState.brushes[b].setContext(initState.canvas.getLayerContext(initState.focus));
                    }
                }
            }
            if (initState.canvas) {
                initState.brushes.smoothBrush.setRequestCanvas(function () {
                    return initState.canvas;
                });
            }
        };
        initState.initBrushes();


        var currentColor = new BV.RGB(0, 0, 0);
        var currentBrush, currentBrushId;
        var lastNonEraserBrushId = 0;
        var currentLayerCtx = pcCanvas.getLayerContext(pcCanvas.getLayerCount() - 1);
        var currentMode = {
            onInput: function () {
            }
        };

        function sizeWatcher(val) {
            brushSettingService.emitSize(val);
            if (pcCanvasWorkspace) {
                pcCanvasWorkspace.setCursorSize(val * 2);
            }
        }

        /**
         * Central place to update brush settings, and to subscribe to changes.
         *
         * subscribers receive in this format:
         * BrushSettingEvent
         * {
         *     type: 'color',
         *     value: rgb obj
         * } | {
         *     type: 'size',
         *     value: number
         * } | {
         *     type: 'opacity',
         *     value: number 0-1
         * } | {
         *     type: 'sliderConfig',
         *     value: {
         *         sizeSlider: {min: number, max: number, curve: []}// curve optional
         *         opacitySlider: {min: number, max: number, curve: []}// curve optional
         *     }
         * }
         *
         * interface in the return.
         *
         * @type obj
         */
        let brushSettingService = (function() {
            let subscriberArr = [];

            /**
             * sends obj to all subscribers. except the skipSubscriber
             * @param obj
             * @param skipSubscriberr - optional - subscriber function not to emit to
             */
            function emit(obj, skipSubscriber) {
                for (let i = 0; i < subscriberArr.length; i++) {
                    if (subscriberArr[i] === skipSubscriber) {
                        continue;
                    }
                    subscriberArr[i](obj);
                }
            }

            function emitColor(rgbObj, skipSubscriber) {
                emit({
                    type: 'color',
                    value: rgbObj
                }, skipSubscriber);
            }

            function emitSize(size, skipSubscriber) {
                emit({
                    type: 'size',
                    value: size
                }, skipSubscriber);
            }

            /**
             * @param opacity 0-1
             * @param skipSubscriber
             */
            function emitOpacity(opacity, skipSubscriber) {
                emit({
                    type: 'opacity',
                    value: opacity
                }, skipSubscriber);
            }

            /**
             * @param config
             * @param skipSubscriber
             */
            function emitSliderConfig(config, skipSubscriber) {
                emit({
                    type: 'sliderConfig',
                    value: config
                }, skipSubscriber);
            }


            return {
                emitColor: emitColor,
                emitSize: emitSize,
                emitOpacity: emitOpacity,
                emitSliderConfig: emitSliderConfig,
                /**
                 * set current brush color
                 * @param rgbObj
                 * @param skipSubscriber
                 */
                setColor: function(rgbObj, skipSubscriber) {//for a subscriber
                    pcColorSlider.setColor(rgbObj);
                    currentBrush.setColor(rgbObj);
                    currentColor = rgbObj;
                    emitColor(rgbObj, skipSubscriber);
                },

                /**
                 * set current brush size
                 * @param size
                 * @param skipSubscriber
                 */
                setSize: function(size, skipSubscriber) {
                    currentBrush.setSize(size);
                    pcCanvasWorkspace.setCursorSize(size * 2);
                },

                /**
                 * set current opacity
                 * @param opacity 0-1
                 * @param skipSubscriber
                 */
                setOpacity: function(opacity, skipSubscriber) {
                    currentBrush.setOpacity(opacity);
                },

                /**
                 * get current brush color
                 * @returns rgbObj
                 */
                getColor: function() {
                    return pcColorSlider.getColor();
                },
                /**
                 * @returns number
                 */
                getSize: function() {
                    return brushUiObj[currentBrushId].getSize();
                },
                /**
                 * @returns number 0-1
                 */
                getOpacity: function() {
                    return brushUiObj[currentBrushId].getOpacity();
                },
                /**
                 * @returns config
                 */
                getSliderConfig: function() {
                    return {
                        sizeSlider: BV.BrushLibUI[currentBrushId].sizeSlider,
                        opacitySlider: BV.BrushLibUI[currentBrushId].opacitySlider
                    };
                },
                /**
                 * subscribe to changes
                 * @param func(BrushSettingEvent) - this function gets called on change
                 */
                subscribe: function(func) {
                    subscriberArr.push(func);
                },
                unsubscribe: function(func) {
                    for(let i = 0; i < subscriberArr.length; i++) {
                        if(func === subscriberArr[i]) {
                            subscriberArr.splice(i, 1);
                            i--;
                        }
                    }
                }
            };
        })();

        let lineSmoothing = new BV.EventChain.LineSmoothing({
            smoothing: translateSmoothing(1)
        });
        let lineSanitizer = new BV.EventChain.LineSanitizer({});

        let drawEventChain = new BV.EventChain.EventChain({
            chainArr: [
                lineSanitizer,
                lineSmoothing
            ]
        });
        //window.line = [];
        drawEventChain.setChainOut(function(event) {
            if(event.type === 'down') {
                toolspace.style.pointerEvents = 'none';
                currentBrush.startLine(event.x, event.y, event.pressure);
                //window.line.push(['start', event.x, event.y, event.pressure]);
                pcCanvasWorkspace.requestFrame();
            }
            if(event.type === 'move') {
                currentBrush.goLine(event.x, event.y, event.pressure, false, event.isCoalesced)
                //window.line.push(['goLine', event.x, event.y, event.pressure, false, event.isCoalesced]);
                pcCanvasWorkspace.setLastDrawEvent(event.x, event.y, event.pressure);
                pcCanvasWorkspace.requestFrame();
            }
            if(event.type === 'up') {
                toolspace.style.pointerEvents = '';
                currentBrush.endLine();
                //window.line.push(['endLine']);
                pcCanvasWorkspace.requestFrame();
            }
            if(event.type === 'line') {
                currentBrush.getBrush().drawLineSegment(event.x0, event.y0, event.x1, event.y1);
                pcCanvasWorkspace.requestFrame();
            }
        });

        /*window.drawLine = function(lineArr) {

            for(let i = 0; i < lineArr.length; i++) {
                let item = lineArr[i];
                if (item[0] === 'start') {
                    currentBrush.startLine(item[1], item[2], item[3]);
                }
                if (item[0] === 'goLine') {
                    let offset = 0;//i % 2 === 0 ? 50 : -50;
                    currentBrush.goLine(item[1] + offset, item[2], item[3], item[4], item[5]);
                }
                if (item[0] === 'endLine') {
                    currentBrush.endLine();
                }
            }
            pcCanvasWorkspace.requestFrame();
        };
        setTimeout(function() {
            currentBrush.setOpacity(0.2);
            window.drawLine(JSON.parse('[["start",565,195,0.3427734375],["goLine",563,198,0.34765625,false,false],["goLine",560,203.5,0.35400390625,false,false],["goLine",556.5,212.25,0.375244140625,false,false],["goLine",552.25,224.625,0.4102783203125,false,false],["goLine",548.625,241.8125,0.46148681640625,false,false],["goLine",545.3125,264.90625,0.509552001953125,false,false],["goLine",543.65625,294.453125,0.5526275634765625,false,false],["goLine",543.828125,330.7265625,0.5922317504882812,false,false],["goLine",547.9140625,374.36328125,0.6315650939941406,false,false],["goLine",557.45703125,423.681640625,0.6639270782470703,false,false],["goLine",572.728515625,477.3408203125,0.6810846328735352,false,false],["goLine",595.3642578125,533.17041015625,0.6862454414367676,false,false],["goLine",624.18212890625,589.085205078125,0.6365797519683838,false,false],["goLine",659.091064453125,642.5426025390625,0.4139930009841919,false,false],["endLine"]]'));
            //window.drawLine(JSON.parse('[["start",370,221,0.427734375],["goLine",370,225,0.51416015625,false,true],["goLine",370.5,230.5,0.557373046875,false,false],["goLine",371.75,238.25,0.6287841796875,false,true],["goLine",373.875,248.625,0.66448974609375,false,true],["goLine",376.4375,261.8125,0.682342529296875,false,false],["goLine",380.21875,277.90625,0.6927337646484375,false,true],["goLine",384.109375,295.453125,0.6979293823242188,false,false],["goLine",388.5546875,313.7265625,0.6795310974121094,false,true],["goLine",393.27734375,330.86328125,0.6703319549560547,false,false],["goLine",398.138671875,345.931640625,0.5998144149780273,false,false],["endLine"],["start",441,223,0.24609375],["goLine",439,226.5,0.3076171875,false,false],["goLine",437,230.25,0.40478515625,false,true],["goLine",434.5,235.125,0.453369140625,false,false],["goLine",431.25,241.5625,0.5362548828125,false,true],["goLine",427.625,250.28125,0.57769775390625,false,false],["goLine",423.3125,260.640625,0.628204345703125,false,true],["goLine",418.65625,273.8203125,0.6534576416015625,false,false],["goLine",413.328125,289.41015625,0.6841506958007812,false,true],["goLine",408.1640625,306.705078125,0.6994972229003906,false,true],["goLine",403.08203125,325.8525390625,0.7071704864501953,false,false],["goLine",398.041015625,345.92626953125,0.7100305557250977,false,true],["goLine",394.0205078125,365.463134765625,0.7114605903625488,false,false],["goLine",390.51025390625,383.7315673828125,0.7004568576812744,false,true],["goLine",387.255126953125,399.36578369140625,0.6949549913406372,false,false],["goLine",385.1275634765625,411.6828918457031,0.5418134331703186,false,true],["goLine",383.56378173828125,420.34144592285156,0.4652426540851593,false,false],["goLine",382.7818908691406,425.6707229614258,0.27803148329257965,false,false],["endLine"],["start",457,298,0.4521484375],["goLine",455,297.5,0.4970703125,false,false],["goLine",452.5,296.75,0.57373046875,false,true],["goLine",449.75,296.375,0.612060546875,false,true],["goLine",446.375,296.1875,0.6312255859375,false,false],["goLine",442.6875,296.59375,0.65350341796875,false,true],["goLine",438.34375,297.796875,0.664642333984375,false,false],["goLine",434.171875,299.3984375,0.6785125732421875,false,true],["goLine",430.0859375,302.19921875,0.6854476928710938,false,false],["goLine",426.04296875,306.099609375,0.6947746276855469,false,true],["goLine",422.521484375,310.5498046875,0.6994380950927734,false,false],["goLine",420.2607421875,316.27490234375,0.7056760787963867,false,true],["goLine",418.63037109375,322.137451171875,0.7087950706481934,false,true],["goLine",418.315185546875,329.0687255859375,0.7103545665740967,false,false],["goLine",419.6575927734375,336.03436279296875,0.7111343145370483,false,true],["goLine",422.32879638671875,342.5171813964844,0.7115241885185242,false,false],["goLine",426.1643981933594,347.7585906982422,0.7117191255092621,false,true],["goLine",431.0821990966797,351.8792953491211,0.711816594004631,false,false],["goLine",436.54109954833984,353.93964767456055,0.7089356407523155,false,true],["goLine",442.2705497741699,354.4698238372803,0.7074951641261578,false,false],["goLine",447.63527488708496,352.73491191864014,0.7097046133130789,false,true],["goLine",452.8176374435425,348.86745595932007,0.7108093379065394,false,false],["goLine",457.40881872177124,343.43372797966003,0.7221038877032697,false,true],["goLine",461.2044093608856,336.21686398983,0.7277511626016349,false,true],["goLine",464.1022046804428,328.608431994915,0.7305748000508174,false,false],["goLine",465.5511023402214,320.3042159974575,0.7251506812754087,false,true],["goLine",466.2755511701107,312.65210799872875,0.7224386218877044,false,false],["goLine",466.13777558505535,305.8260539993644,0.6893443109438522,false,true],["goLine",464.5688877925277,300.4130269996822,0.6727971554719261,false,false],["goLine",462.28444389626384,296.2065134998411,0.568332171485963,false,true],["goLine",459.1422219481319,293.60325674992055,0.5160996794929815,false,false],["goLine",455.57111097406596,292.3016283749603,0.41039358974649076,false,false],["endLine"],["start",486,292,0.00178515625],["goLine",484.5,294.5,0.313392578125,false,true],["goLine",483.25,296.75,0.4691962890625,false,true],["goLine",482.125,299.875,0.5470981445312499,false,false],["goLine",481.0625,303.4375,0.605092041015625,false,true],["goLine",480.53125,307.71875,0.6340889892578125,false,false],["goLine",480.265625,312.859375,0.6632359008789063,false,true],["goLine",480.1328125,318.4296875,0.6778093566894532,false,false],["goLine",481.06640625,324.21484375,0.6919320220947266,false,true],["goLine",482.533203125,330.107421875,0.6989933547973632,false,false],["goLine",484.7666015625,335.5537109375,0.7030123023986816,false,true],["goLine",487.38330078125,340.27685546875,0.7050217761993408,false,true],["goLine",490.691650390625,344.138427734375,0.7060265130996703,false,false],["goLine",493.8458251953125,346.5692138671875,0.7031109127998352,false,true],["goLine",496.92291259765625,347.28460693359375,0.7016531126499176,false,false],["goLine",499.9614562988281,346.1423034667969,0.6984828063249588,false,true],["goLine",502.98072814941406,343.57115173339844,0.6968976531624794,false,false],["goLine",505.49036407470703,339.7855758666992,0.6965933578312398,false,true],["goLine",507.7451820373535,335.3927879333496,0.6964412101656199,false,false],["goLine",509.87259101867676,330.1963939666748,0.6973416988328099,false,true],["goLine",511.4362955093384,324.5981969833374,0.697791943166405,false,true],["goLine",513.2181477546692,319.7990984916687,0.6980170653332025,false,false],["goLine",514.1090738773346,315.39954924583435,0.6961765014166013,false,true],["goLine",515.0545369386673,311.6997746229172,0.6952562194583006,false,false],["goLine",515.5272684693336,308.8498873114586,0.6933312347291503,false,true],["goLine",515.7636342346668,306.9249436557293,0.6923687423645751,false,false],["goLine",515.8818171173334,306.46247182786465,0.7045828086822876,false,false],["goLine",515.9409085586667,307.2312359139323,0.7302210918411438,false,true],["goLine",515.9704542793334,309.61561795696616,0.7430402334205719,false,true],["goLine",515.9852271396667,313.3078089784831,0.749449804210286,false,false],["goLine",516.4926135698333,317.65390448924154,0.754119433355143,false,true],["goLine",517.2463067849167,322.82695224462077,0.7564542479275715,false,false],["goLine",518.6231533924583,328.4134761223104,0.7468794677137858,false,true],["goLine",520.3115766962292,333.7067380611552,0.7420920776068929,false,false],["goLine",522.6557883481146,337.8533690305776,0.6449718200534464,false,true],["goLine",525.8278941740573,341.4266845152888,0.5964116912767232,false,false],["endLine"],["start",617,289,0.00141015625],["goLine",613.5,289,0.193576171875,false,false],["goLine",609.75,289.5,0.3370224609375,false,true],["goLine",605.875,290.25,0.40874560546875,false,false],["goLine",601.9375,291.625,0.508572021484375,false,true],["goLine",597.46875,293.3125,0.5584852294921875,false,false],["goLine",592.734375,295.65625,0.6127387084960938,false,true],["goLine",587.8671875,298.828125,0.6398654479980469,false,false],["goLine",582.93359375,302.4140625,0.6705186614990235,false,true],["goLine",578.966796875,307.20703125,0.6858452682495118,false,false],["goLine",575.4833984375,312.603515625,0.6988796653747559,false,true],["goLine",572.74169921875,318.8017578125,0.705396863937378,false,false],["goLine",571.370849609375,325.40087890625,0.706214056968689,false,true],["goLine",572.1854248046875,332.700439453125,0.7066226534843445,false,false],["goLine",574.5927124023438,339.8502197265625,0.7097566392421722,false,true],["goLine",578.7963562011719,346.42510986328125,0.7113236321210861,false,true],["goLine",584.3981781005859,351.7125549316406,0.712107128560543,false,false],["goLine",591.699089050293,355.8562774658203,0.7076160642802716,false,true],["goLine",599.8495445251465,357.92813873291016,0.7053705321401358,false,false],["goLine",608.4247722625732,357.9640693664551,0.6588376098200679,false,true],["goLine",617.2123861312866,355.48203468322754,0.635571148660034,false,false],["goLine",626.1061930656433,351.74101734161377,0.483801199330017,false,true],["goLine",634.0530965328217,347.3705086708069,0.4079162246650085,false,false],["endLine"],["start",662,304,0.0007968750000000001],["goLine",660,304,0.31631640625,false,true],["goLine",658,304,0.474076171875,false,false],["goLine",656.5,304,0.5676044921875,false,true],["goLine",654.75,304,0.6143686523437499,false,false],["goLine",652.875,304,0.656305419921875,false,true],["goLine",650.9375,304,0.6772738037109375,false,false],["goLine",648.96875,304,0.7111954956054687,false,true],["goLine",646.484375,304.5,0.7281563415527343,false,false],["goLine",644.2421875,305.25,0.7561680145263672,false,true],["goLine",642.12109375,306.625,0.7701738510131836,false,true],["goLine",640.060546875,308.8125,0.7771767692565918,false,false],["goLine",638.0302734375,311.40625,0.7845844783782959,false,true],["goLine",636.51513671875,314.703125,0.7882883329391479,false,false],["goLine",635.757568359375,318.8515625,0.793069947719574,false,true],["goLine",635.3787841796875,322.92578125,0.795460755109787,false,false],["goLine",635.1893920898438,327.462890625,0.7986092838048935,false,true],["goLine",636.0946960449219,332.2314453125,0.8001835481524467,false,false],["goLine",637.5473480224609,336.11572265625,0.8009706803262233,false,true],["goLine",639.7736740112305,339.057861328125,0.8013642464131117,false,false],["goLine",642.3868370056152,340.5289306640625,0.7991196232065558,false,true],["goLine",645.1934185028076,340.76446533203125,0.7979973116032779,false,true],["goLine",648.5967092514038,339.3822326660156,0.797436155801639,false,false],["goLine",651.7983546257019,336.1911163330078,0.7976438591508195,false,true],["goLine",654.399177312851,332.0955581665039,0.7977477108254097,false,false],["goLine",657.1995886564255,327.54777908325195,0.7977996366627049,false,true],["goLine",660.0997943282127,322.773889541626,0.7978255995813525,false,false],["goLine",662.5498971641064,317.886944770813,0.7953971747906763,false,true],["goLine",664.2749485820532,313.9434723854065,0.7941829623953381,false,false],["goLine",665.6374742910266,310.47173619270325,0.7906461686976691,false,true],["goLine",666.8187371455133,307.7358680963516,0.7888777718488346,false,false],["goLine",667.9093685727566,305.8679340481758,0.7870170109244172,false,false],["goLine",668.4546842863783,305.4339670240879,0.8017116304622086,false,true],["goLine",668.7273421431892,306.21698351204395,0.8090589402311044,false,true],["goLine",668.8636710715946,308.108491756022,0.8127325951155522,false,false],["goLine",668.9318355357973,311.554245878011,0.8209170788077761,false,true],["goLine",668.9659177678986,315.7771229390055,0.825009320653888,false,false],["goLine",668.9829588839493,320.88856146950275,0.828520285326944,false,true],["goLine",669.9914794419747,325.9442807347514,0.830275767663472,false,false],["goLine",670.9957397209873,330.9721403673757,0.830665227581736,false,true],["goLine",672.4978698604937,335.48607018368784,0.8308599575408679,false,false],["goLine",674.7489349302468,339.2430350918439,0.823144822520434,false,true],["goLine",676.8744674651234,341.62151754592196,0.819287255010217,false,false],["goLine",679.4372337325617,342.810758772961,0.7494873775051085,false,true],["goLine",681.2186168662809,342.4053793864805,0.7145874387525543,false,false],["endLine"],["start",688,292,0.00194921875],["goLine",687,295,0.337400390625,false,true],["goLine",686.5,298.5,0.5051259765625,false,true],["goLine",686.25,302.25,0.58898876953125,false,false],["goLine",686.125,306.625,0.635802978515625,false,true],["goLine",686.0625,311.3125,0.6592100830078125,false,false],["goLine",686.03125,316.65625,0.6792144165039062,false,true],["goLine",686.015625,321.828125,0.6892165832519531,false,false],["goLine",686.5078125,326.4140625,0.7020301666259765,false,true],["goLine",687.25390625,330.20703125,0.7084369583129883,false,false],["goLine",688.126953125,333.603515625,0.7165231666564942,false,true],["goLine",689.0634765625,335.3017578125,0.7205662708282471,false,false],["goLine",690.03173828125,336.15087890625,0.7206346979141236,false,true],["goLine",691.015869140625,336.075439453125,0.7206689114570618,false,true],["goLine",692.5079345703125,334.0377197265625,0.7206860182285308,false,false],["goLine",694.2539672851562,331.01885986328125,0.7231359778642654,false,true],["goLine",696.1269836425781,326.5094299316406,0.7243609576821327,false,false],["goLine",698.5634918212891,321.7547149658203,0.7239968850910663,false,true],["goLine",701.2817459106445,316.87735748291016,0.7238148487955332,false,false],["goLine",704.1408729553223,311.9386787414551,0.7222589868977666,false,true],["goLine",707.5704364776611,307.96933937072754,0.7214810559488833,false,false],["goLine",711.2852182388306,304.98466968536377,0.7196272467244417,false,true],["goLine",714.6426091194153,302.9923348426819,0.7187003421122209,false,false],["goLine",718.3213045597076,301.99616742134094,0.7177486085561104,false,true],["goLine",721.6606522798538,301.49808371067047,0.7172727417780552,false,true],["goLine",724.8303261399269,302.24904185533524,0.7170348083890277,false,false],["goLine",727.9151630699635,304.1245209276676,0.7174041229445138,false,true],["goLine",730.4575815349817,307.0622604638338,0.7175887802222569,false,false],["goLine",732.7287907674909,311.0311302319169,0.7186576713611285,false,true],["goLine",734.3643953837454,316.01556511595845,0.7191921169305642,false,false],["goLine",735.1821976918727,321.5077825579792,0.7199476209652821,false,true],["goLine",736.0910988459364,327.2538912789896,0.7203253729826411,false,false],["goLine",736.5455494229682,333.6269456394948,0.6985415927413205,false,true],["goLine",737.2727747114841,339.3134728197474,0.6876497026206603,false,false],["goLine",737.636387355742,344.6567364098737,0.5313248513103301,false,true],["goLine",738.318193677871,348.82836820493685,0.45316242565516507,false,false],["endLine"],["start",417,510,0.00190234375],["goLine",418,506.5,0.263158203125,false,false],["goLine",419,501.25,0.32347363281249997,false,true],["goLine",420,494.125,0.35363134765625,false,false],["goLine",421,486.5625,0.380917236328125,false,true],["goLine",422,478.78125,0.3945601806640625,false,false],["goLine",422.5,471.390625,0.41114727783203125,false,true],["goLine",422.75,464.1953125,0.41944082641601566,false,false],["goLine",422.875,457.59765625,0.4470251007080078,false,true],["goLine",421.9375,451.798828125,0.4608172378540039,false,true],["goLine",420.46875,447.3994140625,0.46771330642700193,false,false],["goLine",418.234375,443.69970703125,0.49801680946350096,false,true],["goLine",415.6171875,441.349853515625,0.5131685609817505,false,false],["goLine",412.80859375,440.1749267578125,0.5607834992408752,false,true],["goLine",409.904296875,441.08746337890625,0.5845909683704376,false,false],["goLine",406.9521484375,444.0437316894531,0.6165142341852188,false,true],["goLine",404.47607421875,449.02186584472656,0.6324758670926094,false,false],["goLine",402.238037109375,457.0109329223633,0.6507105897963047,false,true],["goLine",400.1190185546875,467.50546646118164,0.6598279511481524,false,true],["goLine",399.05950927734375,481.2527332305908,0.6643866318240762,false,false],["goLine",398.5297546386719,498.1263666152954,0.666665972162038,false,true],["goLine",398.76487731933594,517.5631833076477,0.667805642331019,false,false],["goLine",399.88243865966797,539.2815916538239,0.6693520399155095,false,true],["goLine",401.941219329834,562.6407958269119,0.6701252387077548,false,false],["goLine",404.970609664917,586.320397913456,0.6465860568538774,false,true],["goLine",407.9853048324585,608.660198956728,0.6348164659269386,false,true],["goLine",410.99265241622925,628.830099478364,0.6289316704634693,false,false],["goLine",413.4963262081146,645.915049739182,0.45557911648173466,false,true],["goLine",415.7481631040573,659.457524869591,0.36890283949086733,false,false],["endLine"],["start",403,664,0.0005625000000000001],["goLine",400,659.5,0.170203125,false,true],["goLine",395,652.25,0.2550234375,false,true],["goLine",389.5,642.625,0.29743359375,false,false],["goLine",383.75,631.8125,0.413365234375,false,true],["goLine",378.375,620.40625,0.47133105468750003,false,false],["goLine",374.6875,609.203125,0.52131005859375,false,true],["goLine",372.34375,598.1015625,0.546299560546875,false,false],["goLine",371.671875,587.55078125,0.5670950927734375,false,true],["goLine",373.3359375,578.775390625,0.5774928588867188,false,false],["goLine",376.66796875,571.3876953125,0.6095472106933594,false,true],["goLine",381.833984375,565.19384765625,0.6255743865966796,false,false],["goLine",388.4169921875,561.096923828125,0.6497012557983398,false,true],["goLine",395.70849609375,558.5484619140625,0.6617646903991699,false,false],["goLine",403.354248046875,557.2742309570312,0.4563706264495849,false,true],["goLine",410.6771240234375,557.1371154785156,0.35367359447479246,false,true],["goLine",417.83856201171875,558.0685577392578,0.3023250784873962,false,false],["endLine"],["start",433,536,0.00144140625],["goLine",433,538.5,0.317615234375,false,false],["goLine",433,541.25,0.5001162109375,false,true],["goLine",433,544.125,0.5913666992187501,false,true],["goLine",433,547.5625,0.636991943359375,false,false],["goLine",433,551.28125,0.6734764404296876,false,true],["goLine",433.5,555.640625,0.6917186889648438,false,false],["goLine",434.25,559.8203125,0.7042577819824218,false,true],["goLine",435.125,564.41015625,0.7105273284912109,false,false],["goLine",436.5625,568.205078125,0.7126855392456055,false,true],["goLine",438.78125,571.6025390625,0.7137646446228028,false,false],["goLine",441.390625,574.30126953125,0.6869604473114014,false,true],["goLine",444.1953125,575.650634765625,0.6735583486557006,false,false],["goLine",446.59765625,575.8253173828125,0.6302362055778503,false,true],["goLine",449.298828125,574.4126586914062,0.6085751340389252,false,true],["goLine",451.6494140625,571.2063293457031,0.5977445982694626,false,false],["goLine",453.82470703125,567.1031646728516,0.5884230803847312,false,true],["goLine",455.912353515625,562.0515823364258,0.5837623214423656,false,false],["goLine",457.9561767578125,557.0257911682129,0.5804553794711829,false,true],["goLine",458.97808837890625,552.0128955841064,0.5788019084855914,false,false],["goLine",459.9890441894531,548.0064477920532,0.5789517354927958,false,true],["goLine",460.99452209472656,544.5032238960266,0.5790266489963979,false,false],["goLine",461.4972610473633,542.2516119480133,0.5785758244981989,false,false],["goLine",461.74863052368164,541.6258059740067,0.6418269747490994,false,true],["goLine",461.8743152618408,542.8129029870033,0.6734525498745497,false,false],["goLine",461.9371576309204,545.4064514935017,0.7131911186872748,false,true],["goLine",462.4685788154602,548.7032257467508,0.7330604030936374,false,true],["goLine",463.2342894077301,553.3516128733754,0.7429950452968187,false,false],["goLine",464.61714470386505,558.1758064366877,0.7499154913984094,false,true],["goLine",466.3085723519325,563.0879032183439,0.7533757144492047,false,false],["goLine",468.15428617596626,567.0439516091719,0.7424105134746024,false,true],["goLine",470.57714308798313,570.521975804586,0.7369279129873012,false,false],["goLine",473.28857154399157,573.260987902293,0.6809639564936506,false,false],["endLine"],["start",508,543,0.0015],["goLine",507.5,541,0.28541796875,false,false],["goLine",506.75,539.5,0.494271484375,false,true],["goLine",505.875,538.75,0.5986982421875,false,false],["goLine",503.9375,537.875,0.68313818359375,false,true],["goLine",501.96875,537.4375,0.725358154296875,false,false],["goLine",499.484375,537.21875,0.7674642333984375,false,true],["goLine",496.7421875,537.609375,0.7885172729492187,false,false],["goLine",493.37109375,538.3046875,0.8102742614746093,false,true],["goLine",490.185546875,539.65234375,0.8211527557373046,false,false],["goLine",487.0927734375,541.826171875,0.8300099716186523,false,false],["goLine",484.04638671875,544.4130859375,0.8407862358093261,false,true],["goLine",481.523193359375,547.20654296875,0.846174367904663,false,false],["goLine",479.2615966796875,550.603271484375,0.8561926527023316,false,true],["goLine",478.13079833984375,554.3016357421875,0.8612017951011658,false,false],["goLine",477.5653991699219,558.1508178710938,0.8715188663005828,false,true],["goLine",477.28269958496094,562.5754089355469,0.8766774019002914,false,false],["goLine",478.14134979248047,566.7877044677734,0.8816980759501457,false,true],["goLine",480.07067489624023,571.3938522338867,0.8842084129750729,false,false],["goLine",483.5353374481201,576.1969261169434,0.8854635814875365,false,true],["goLine",488.26766872406006,580.0984630584717,0.8860911657437682,false,false],["goLine",494.13383436203003,583.0492315292358,0.8859166766218841,false,true],["goLine",500.566917181015,585.0246157646179,0.8858294320609421,false,false],["goLine",506.7834585905075,585.512307882309,0.8721139347804711,false,true],["goLine",512.8917292952538,583.7561539411545,0.8652561861402355,false,true],["goLine",518.4458646476269,580.3780769705772,0.8618273118201177,false,false],["goLine",523.7229323238134,575.6890384852886,0.8083550621600588,false,true],["goLine",527.3614661619067,570.3445192426443,0.7816189373300294,false,false],["goLine",530.1807330809534,564.6722596213222,0.5963758749150148,false,false],["endLine"],["start",525,453,0.00128515625],["goLine",524.5,455.5,0.269197265625,false,true],["goLine",524.25,458.25,0.4031533203125,false,false],["goLine",524.125,461.625,0.50724072265625,false,true],["goLine",524.0625,465.8125,0.5592844238281249,false,false],["goLine",524.03125,470.90625,0.5960484619140625,false,false],["goLine",524.015625,477.953125,0.6237078247070312,false,true],["goLine",524.5078125,486.4765625,0.6375375061035156,false,false],["goLine",524.75390625,496.23828125,0.6454289093017578,false,true],["goLine",525.376953125,507.619140625,0.6493746109008789,false,false],["goLine",525.6884765625,520.3095703125,0.6503708992004394,false,true],["goLine",526.34423828125,533.65478515625,0.6508690433502198,false,false],["goLine",527.672119140625,546.827392578125,0.6525829591751099,false,true],["goLine",528.8360595703125,559.4136962890625,0.6534399170875549,false,false],["goLine",529.9180297851562,570.2068481445312,0.6348254272937774,false,true],["goLine",531.4590148925781,578.6034240722656,0.6255181823968887,false,false],["goLine",532.7295074462891,584.8017120361328,0.5891262786984444,false,true],["goLine",533.8647537231445,587.9008560180664,0.5709303268492222,false,false],["goLine",534.4323768615723,587.9504280090332,0.526676100924611,false,true],["goLine",535.2161884307861,585.4752140045166,0.5045489879623055,false,true],["goLine",535.6080942153931,580.2376070022583,0.49348543148115276,false,false],["goLine",536.3040471076965,573.1188035011292,0.4972309969905764,false,true],["goLine",537.1520235538483,564.0594017505646,0.4991037797452882,false,false],["goLine",538.5760117769241,554.0297008752823,0.5073643898726441,false,true],["goLine",540.2880058884621,544.0148504376411,0.511494694936322,false,false],["goLine",543.144002944231,533.5074252188206,0.5550637537181611,false,true],["goLine",546.5720014721155,523.7537126094103,0.5768482831090805,false,true],["goLine",551.2860007360578,514.8768563047051,0.5877405478045403,false,false],["goLine",556.1430003680289,507.43842815235257,0.6005108989022702,false,true],["goLine",561.5715001840144,501.7192140761763,0.6068960744511351,false,false],["goLine",566.7857500920072,497.85960703808814,0.6139949122255676,false,true],["goLine",570.8928750460036,495.42980351904407,0.6175443311127837,false,false],["goLine",574.4464375230018,495.21490175952204,0.6500807593063919,false,true],["goLine",576.7232187615009,497.107450879761,0.666348973403196,false,false],["goLine",577.8616093807505,500.5537254398805,0.711592455451598,false,true],["goLine",577.4308046903752,505.77686271994025,0.734214196475799,false,true],["goLine",575.7154023451876,511.8884313599701,0.7455250669878994,false,false],["goLine",572.8577011725938,518.4442156799851,0.7545984709939497,false,true],["goLine",569.4288505862969,525.2221078399925,0.7591351729969749,false,false],["goLine",565.2144252931485,532.1110539199963,0.7638449302484874,false,true],["goLine",560.6072126465742,539.0555269599981,0.7661998088742437,false,false],["goLine",555.3036063232871,545.5277634799991,0.7712834981871218,false,true],["goLine",550.1518031616436,551.7638817399995,0.7738253428435609,false,false],["goLine",545.5759015808218,557.8819408699998,0.7765611089217804,false,true],["goLine",541.2879507904108,563.4409704349998,0.7779289919608903,false,false],["goLine",538.1439753952054,568.2204852174999,0.7766598084804451,false,true],["goLine",536.0719876976027,572.61024260875,0.7760252167402226,false,true],["goLine",535.0359938488014,575.805121304375,0.7757079208701113,false,false],["goLine",536.0179969244007,578.4025606521875,0.7716430229350557,false,true],["goLine",539.0089984622003,580.2012803260938,0.7696105739675279,false,false],["goLine",544.0044992311002,581.1006401630468,0.7666412244837639,false,true],["goLine",550.5022496155501,581.0503200815234,0.765156549741882,false,false],["goLine",558.7511248077751,580.5251600407616,0.738535306120941,false,true],["goLine",567.3755624038876,579.7625800203808,0.7252246843104705,false,false],["goLine",576.1877812019438,579.3812900101905,0.6135889046552352,false,false],["endLine"],["start",692,503,0.00045703125],["goLine",689,502.5,0.184310546875,false,true],["goLine",686,502.25,0.2762373046875,false,false],["goLine",683,502.625,0.40716162109375,false,true],["goLine",679.5,503.3125,0.472623779296875,false,true],["goLine",675.75,504.65625,0.5053548583984375,false,false],["goLine",671.875,506.828125,0.5583414916992188,false,true],["goLine",668.4375,509.4140625,0.5848348083496093,false,false],["goLine",665.21875,513.70703125,0.6181009979248047,false,true],["goLine",662.609375,518.853515625,0.6347340927124023,false,false],["goLine",661.3046875,525.4267578125,0.6728357963562012,false,true],["goLine",661.15234375,532.71337890625,0.6918866481781005,false,true],["goLine",662.576171875,541.356689453125,0.7014120740890503,false,false],["goLine",665.2880859375,549.6783447265625,0.7081279120445252,false,true],["goLine",669.14404296875,557.3391723632812,0.7114858310222626,false,false],["goLine",674.572021484375,563.6695861816406,0.7146296342611314,false,true],["goLine",680.7860107421875,567.8347930908203,0.7162015358805657,false,false],["goLine",687.3930053710938,569.4173965454102,0.7418898304402828,false,true],["goLine",693.6965026855469,568.2086982727051,0.7547339777201414,false,false],["goLine",699.8482513427734,564.6043491363525,0.7801990201100707,false,true],["goLine",704.9241256713867,558.3021745681763,0.7929315413050353,false,false],["goLine",708.9620628356934,550.6510872840881,0.8085751456525176,false,true],["goLine",711.9810314178467,542.3255436420441,0.8163969478262588,false,false],["goLine",713.4905157089233,534.162771821022,0.8271437864131295,false,true],["goLine",714.2452578544617,527.081385910511,0.8325172057065647,false,true],["goLine",713.1226289272308,521.0406929552555,0.8352039153532824,false,false],["goLine",710.5613144636154,517.0203464776278,0.8482660201766412,false,true],["goLine",706.2806572318077,514.5101732388139,0.8547970725883206,false,false],["goLine",701.1403286159039,513.2550866194069,0.8614805675441604,false,true],["goLine",695.0701643079519,513.1275433097035,0.8648223150220802,false,false],["goLine",688.535082153976,514.0637716548517,0.8655166262610401,false,true],["goLine",682.267541076988,516.5318858274259,0.86586378188052,false,false],["goLine",677.133770538494,519.7659429137129,0.85285376594026,false,true],["goLine",673.566885269247,523.3829714568565,0.84634875797013,false,false],["goLine",671.2834426346235,527.6914857284282,0.704912660235065,false,true],["goLine",670.1417213173117,531.8457428642141,0.6341946113675325,false,false],["endLine"],["start",744,517,0.00245703125],["goLine",746.5,515,0.309333984375,false,false],["goLine",748.75,512,0.4700966796875,false,true],["goLine",750.375,507.5,0.55047802734375,false,false],["goLine",751.6875,502.25,0.608735107421875,false,true],["goLine",752.84375,496.125,0.6378636474609375,false,false],["goLine",753.421875,489.0625,0.6660997924804688,false,true],["goLine",753.7109375,481.53125,0.6802178649902344,false,false],["goLine",753.35546875,473.265625,0.6906948699951172,false,true],["goLine",751.677734375,465.1328125,0.6959333724975586,false,false],["goLine",748.8388671875,457.06640625,0.6946463737487794,false,true],["goLine",745.41943359375,449.533203125,0.6940028743743897,false,true],["goLine",740.709716796875,442.2666015625,0.6936811246871948,false,false],["goLine",735.3548583984375,435.63330078125,0.6822897810935974,false,true],["goLine",729.6774291992188,430.316650390625,0.6765941092967986,false,false],["goLine",724.3387145996094,426.6583251953125,0.6756993983983993,false,true],["goLine",719.1693572998047,424.82916259765625,0.6752520429491997,false,false],["goLine",714.0846786499023,424.9145812988281,0.7028603964745999,false,true],["goLine",710.0423393249512,427.45729064941406,0.7166645732372999,false,false],["goLine",707.0211696624756,432.72864532470703,0.74309791161865,false,true],["goLine",704.5105848312378,440.8643226623535,0.756314580809325,false,true],["goLine",702.7552924156189,452.43216133117676,0.7629229154046625,false,false],["goLine",701.8776462078094,466.7160806655884,0.7676919264523312,false,true],["goLine",702.4388231039047,483.8580403327942,0.7700764319761656,false,false],["goLine",703.7194115519524,503.9290201663971,0.7707804034880827,false,true],["goLine",705.8597057759762,526.4645100831985,0.7711323892440414,false,false],["goLine",708.9298528879881,551.2322550415993,0.7722849446220207,false,true],["goLine",712.464926443994,577.1161275207996,0.7728612223110103,false,true],["goLine",716.732463221997,602.5580637603998,0.7731493611555051,false,false],["goLine",721.3662316109985,626.7790318801999,0.7747582743277526,false,true],["goLine",726.1831158054993,648.8895159401,0.7755627309138763,false,false],["goLine",730.5915579027496,667.94475797005,0.7657110529569382,false,true],["goLine",734.7957789513748,682.972378985025,0.7607852139784691,false,false],["goLine",737.8978894756874,693.4861894925125,0.7329316694892345,false,true],["goLine",739.9489447378437,700.2430947462562,0.7190048972446172,false,false],["goLine",740.9744723689219,703.1215473731281,0.6715141673723086,false,true],["goLine",741.4872361844609,702.5607736865641,0.6477688024361543,false,false],["goLine",740.7436180922305,698.780386843282,0.6315015887180772,false,true],["goLine",739.3718090461152,692.890193421641,0.6233679818590385,false,false],["goLine",737.1859045230576,684.9450967108205,0.5304339909295193,false,true],["goLine",734.0929522615288,675.4725483554103,0.48396699546475963,false,true],["goLine",731.0464761307644,665.7362741777051,0.4607334977323798,false,false],["goLine",727.5232380653822,655.8681370888526,0.3949175301161899,false,false],["endLine"],["start",703,586,0.0011875],["goLine",706,586,0.26670703125,false,true],["goLine",709,585.5,0.399466796875,false,false],["goLine",712,584.75,0.4761005859375,false,true],["goLine",716,582.875,0.51441748046875,false,false],["goLine",720,580.9375,0.534552490234375,false,false],["goLine",724,578.96875,0.4655184326171875,false,false],["endLine"],["start",811,463,0.000875],["goLine",811,460,0.180125,false,true],["goLine",810.5,456,0.26975,false,true],["goLine",808.75,451.5,0.31456249999999997,false,false],["goLine",806.875,446.75,0.405328125,false,true],["goLine",803.9375,442.375,0.4507109375,false,false],["goLine",800.96875,438.1875,0.526625,false,true],["goLine",797.484375,434.59375,0.5645820312500001,false,false],["goLine",793.7421875,431.296875,0.612369140625,false,true],["goLine",789.87109375,429.1484375,0.6362626953125,false,false],["goLine",785.935546875,428.07421875,0.68873681640625,false,true],["goLine",782.4677734375,428.537109375,0.714973876953125,false,true],["goLine",779.23388671875,430.7685546875,0.7280924072265624,false,false],["goLine",776.616943359375,434.88427734375,0.7434407348632812,false,true],["goLine",774.3084716796875,440.942138671875,0.7511148986816406,false,false],["goLine",772.1542358398438,449.4710693359375,0.7603230743408202,false,true],["goLine",771.0771179199219,460.73553466796875,0.7649271621704101,false,false],["goLine",771.0385589599609,474.8677673339844,0.7765065498352051,false,true],["goLine",772.0192794799805,491.9338836669922,0.7822962436676025,false,false],["goLine",774.5096397399902,511.9669418334961,0.7900739030838013,false,true],["goLine",778.2548198699951,534.983470916748,0.7939627327919007,false,false],["goLine",783.1274099349976,559.991735458374,0.8061610538959503,false,true],["goLine",788.5637049674988,585.495867729187,0.8122602144479751,false,true],["goLine",794.7818524837494,610.7479338645935,0.8153097947239876,false,false],["goLine",800.8909262418747,634.3739669322968,0.8163463036119938,false,true],["goLine",806.4454631209373,655.1869834661484,0.8168645580559969,false,false],["goLine",811.2227315604687,672.0934917330742,0.8029635290279984,false,true],["goLine",815.1113657802343,684.5467458665371,0.7960130145139992,false,false],["goLine",818.0556828901172,692.2733729332685,0.7471276010069996,false,true],["goLine",820.0278414450586,696.1366864666343,0.7226848942534998,false,false],["goLine",821.0139207225293,696.0683432333171,0.5859518221267499,false,true],["goLine",820.5069603612646,693.0341716166586,0.517585286063375,false,false],["goLine",819.2534801806323,687.5170858083293,0.2861363930316875,false,false],["endLine"],["start",766,604,0.00129296875],["goLine",763.5,603.5,0.168126953125,false,true],["goLine",761.25,603.25,0.2515439453125,false,false],["goLine",759.625,602.625,0.33768603515625,false,true],["goLine",757.8125,601.8125,0.38075708007812503,false,true],["goLine",755.90625,600.40625,0.4022926025390625,false,false],["goLine",754.453125,598.703125,0.46042364501953126,false,true],["goLine",753.2265625,596.8515625,0.48948916625976563,false,false],["goLine",752.11328125,594.42578125,0.5460141143798828,false,true],["goLine",751.056640625,591.712890625,0.5742765884399414,false,false],["goLine",750.5283203125,589.3564453125,0.6094039192199707,false,true],["goLine",750.26416015625,586.67822265625,0.6269675846099854,false,false],["goLine",750.132080078125,583.839111328125,0.6552806673049927,false,true],["goLine",751.0660400390625,580.4195556640625,0.6694372086524963,false,false],["goLine",753.5330200195312,577.2097778320312,0.7165545418262482,false,true],["goLine",757.2665100097656,574.1048889160156,0.7401132084131241,false,false],["goLine",762.6332550048828,571.0524444580078,0.7699589479565621,false,true],["goLine",768.8166275024414,568.0262222290039,0.784881817728281,false,false],["goLine",775.9083137512207,565.013111114502,0.7874604401141405,false,true],["goLine",783.9541568756104,562.006555557251,0.7887497513070703,false,true],["goLine",791.9770784378052,558.5032777786255,0.7893944069035351,false,false],["goLine",799.4885392189026,555.2516388893127,0.6095409534517675,false,true],["goLine",806.2442696094513,552.1258194446564,0.5196142267258838,false,false],["endLine"],["start",876,370,0.001453125],["goLine",875.5,373.5,0.3620546875,false,true],["goLine",874.75,377.75,0.5423554687500001,false,false],["goLine",873.875,383.375,0.664732421875,false,true],["goLine",872.4375,391.6875,0.7259208984375001,false,false],["goLine",871.21875,402.34375,0.77604638671875,false,true],["goLine",869.609375,415.671875,0.801109130859375,false,false],["goLine",868.3046875,431.3359375,0.8229178466796875,false,true],["goLine",867.15234375,449.66796875,0.8338222045898438,false,false],["goLine",866.076171875,469.833984375,0.8417157897949219,false,true],["goLine",865.0380859375,490.4169921875,0.845662582397461,false,true],["goLine",864.01904296875,510.70849609375,0.8476359786987304,false,false],["goLine",863.509521484375,529.354248046875,0.8437398643493652,false,true],["goLine",862.7547607421875,546.1771240234375,0.8417918071746826,false,false],["goLine",861.8773803710938,559.5885620117188,0.7299779348373413,false,true],["goLine",861.4386901855469,569.7942810058594,0.6740709986686706,false,false],["endLine"],["start",868,607,0.00237109375],["goLine",866,605.5,0.348841796875,false,false],["goLine",864.5,604.25,0.5630927734375,false,true],["goLine",862.75,603.625,0.67021826171875,false,false],["goLine",861.375,603.3125,0.735011474609375,false,true],["goLine",860.1875,603.65625,0.7674080810546875,false,false],["goLine",859.59375,604.328125,0.7880009155273437,false,true],["goLine",859.296875,605.6640625,0.7982973327636719,false,false],["goLine",859.1484375,606.83203125,0.804422103881836,false,true],["goLine",859.57421875,608.416015625,0.807484489440918,false,false],["goLine",861.287109375,609.7080078125,0.809015682220459,false,true],["goLine",863.1435546875,610.85400390625,0.8097812786102295,false,true],["goLine",865.07177734375,611.427001953125,0.8101640768051148,false,false],["goLine",867.535888671875,611.7135009765625,0.8167031321525574,false,true],["goLine",869.2679443359375,610.8567504882812,0.8199726598262786,false,false],["goLine",870.6339721679688,609.4283752441406,0.8255136736631393,false,true],["goLine",871.8169860839844,607.2141876220703,0.8282841805815697,false,false],["goLine",872.4084930419922,604.6070938110352,0.8325991215407849,false,true],["goLine",872.7042465209961,602.3035469055176,0.8347565920203924,false,false],["goLine",871.852123260498,600.6517734527588,0.8412064210101962,false,true],["goLine",870.926061630249,599.8258867263794,0.8444313355050981,false,false],["goLine",869.4630308151245,599.4129433631897,0.849950042752549,false,true],["goLine",868.2315154075623,599.7064716815948,0.8527093963762745,false,false],["goLine",867.1157577037811,600.3532358407974,0.8330929794381372,false,true],["goLine",866.5578788518906,601.6766179203987,0.8232847709690686,false,true],["goLine",866.2789394259453,603.3383089601994,0.8183806667345344,false,false],["goLine",866.6394697129726,604.6691544800997,0.7172958021172672,false,false],["endLine"],["start",801,202,0.00177734375],["goLine",797.5,200.5,0.281162109375,false,false],["goLine",793.25,198.75,0.44868652343750004,false,true],["goLine",788.125,196.375,0.53244873046875,false,false],["goLine",782.0625,194.1875,0.576771240234375,false,true],["goLine",775.03125,191.59375,0.5989324951171875,false,false],["goLine",766.515625,188.796875,0.6100131225585937,false,true],["goLine",757.2578125,185.3984375,0.6155534362792969,false,false],["goLine",747.12890625,182.19921875,0.6193001556396485,false,true],["goLine",736.064453125,178.599609375,0.6211735153198242,false,true],["goLine",723.5322265625,175.2998046875,0.6221101951599122,false,false],["goLine",710.26611328125,171.64990234375,0.6245316600799561,false,true],["goLine",696.133056640625,167.824951171875,0.6257423925399781,false,false],["goLine",680.5665283203125,164.4124755859375,0.625371196269989,false,true],["goLine",664.2832641601562,160.70623779296875,0.6251855981349945,false,false],["goLine",647.1416320800781,156.85311889648438,0.6260693615674973,false,true],["goLine",629.0708160400391,152.9265594482422,0.6265112432837486,false,false],["goLine",610.0354080200195,148.9632797241211,0.6301501528918743,false,true],["goLine",590.5177040100098,145.48163986206055,0.6319696076959371,false,true],["goLine",570.2588520050049,142.24081993103027,0.6328793350979686,false,false],["goLine",549.6294260025024,139.62040996551514,0.6343107612989842,false,true],["goLine",528.3147130012512,137.81020498275757,0.6350264743994921,false,false],["goLine",507.1573565006256,136.90510249137878,0.634896049699746,false,true],["goLine",485.5786782503128,136.4525512456894,0.634830837349873,false,false],["goLine",463.7893391251564,137.2262756228447,0.6357747936749365,false,true],["goLine",441.8946695625782,138.61313781142235,0.6362467718374683,false,true],["goLine",420.4473347812891,141.30656890571117,0.6364827609187341,false,false],["goLine",399.22366739064455,144.6532844528556,0.6463663804593671,false,true],["goLine",378.6118336953223,148.8266422264278,0.6513081902296836,false,false],["goLine",359.30591684766114,153.4133211132139,0.6562205013648418,false,true],["goLine",340.65295842383057,159.20666055660695,0.658676656932421,false,false],["goLine",322.8264792119153,165.60333027830347,0.6677172347162105,false,true],["goLine",306.41323960595764,172.30166513915174,0.6722375236081053,false,false],["goLine",291.2066198029788,180.65083256957587,0.6764507930540526,false,true],["goLine",277.6033099014894,189.82541628478793,0.6785574277770263,false,false],["goLine",265.3016549507447,200.41270814239397,0.6825404326385132,false,true],["goLine",254.65082747537235,212.70635407119698,0.6845319350692566,false,false],["goLine",245.32541373768618,226.3531770355985,0.6913870612846282,false,true],["goLine",237.6627068688431,240.67658851779925,0.6948146243923141,false,true],["goLine",231.33135343442154,255.33829425889962,0.6965284059461571,false,false],["goLine",226.66567671721077,270.1691471294498,0.6920142029730785,false,true],["goLine",223.3328383586054,284.0845735647249,0.6897571014865392,false,false],["goLine",221.1664191793027,296.54228678236245,0.6788629257432697,false,true],["goLine",219.58320958965135,307.2711433911812,0.6734158378716348,false,false],["goLine",218.79160479482567,316.1355716955906,0.6716688564358174,false,true],["goLine",218.39580239741284,323.06778584779534,0.6707953657179087,false,false],["goLine",218.1979011987064,329.03389292389767,0.6674289328589543,false,true],["goLine",218.0989505993532,334.0169464619488,0.6657457164294771,false,false],["goLine",218.0494752996766,338.5084732309744,0.6419548894647386,false,true],["goLine",217.0247376498383,342.75423661548723,0.6300594759823692,false,false],["goLine",214.51236882491915,347.3771183077436,0.6114164567411846,false,true],["goLine",211.25618441245956,353.1885591538718,0.6020949471205923,false,true],["goLine",207.12809220622978,360.0942795769359,0.5974341923102962,false,false],["goLine",202.0640461031149,368.5471397884679,0.6112170961551481,false,true],["goLine",196.03202305155745,378.27356989423396,0.6181085480775741,false,false],["goLine",189.5160115257787,389.136784947117,0.648898024038787,false,true],["goLine",182.75800576288935,401.0683924735585,0.6642927620193935,false,false],["goLine",175.37900288144468,414.5341962367793,0.6851737247596967,false,true],["goLine",168.18950144072232,428.76709811838964,0.6956142061298484,false,false],["goLine",161.59475072036116,444.3835490591948,0.7027875718149241,false,true],["goLine",155.29737536018058,460.6917745295974,0.7063742546574621,false,true],["goLine",149.6486876800903,477.8458872647987,0.708167596078731,false,false],["goLine",144.82434384004515,495.4229436323993,0.6909978605393655,false,true],["goLine",140.91217192002256,512.2114718161997,0.6824129927696827,false,false],["goLine",137.95608596001128,528.6057359080999,0.6693314963848414,false,true],["goLine",135.97804298000563,543.8028679540499,0.6627907481924207,false,false],["goLine",134.9890214900028,557.4014339770249,0.6600086553462103,false,true],["goLine",134.9945107450014,568.7007169885125,0.6586176089231052,false,false],["goLine",135.49725537250072,577.8503584942562,0.6349728669615526,false,true],["goLine",136.74862768625036,584.9251792471281,0.6231504959807763,false,true],["goLine",138.37431384312518,590.4625896235641,0.6172393104903882,false,false],["goLine",140.18715692156258,594.731294811782,0.6015884052451941,false,true],["goLine",142.0935784607813,598.865647405891,0.593762952622597,false,false],["goLine",144.54678923039063,603.4328237029455,0.5952213200612986,false,true],["goLine",146.77339461519531,608.7164118514727,0.5959505037806493,false,false],["goLine",149.38669730759767,615.3582059257363,0.6070572831403247,false,true],["goLine",151.69334865379884,622.6791029628682,0.6126106728201623,false,true],["goLine",153.8466743268994,630.8395514814341,0.6153873676600812,false,false],["goLine",155.4233371634497,639.9197757407171,0.6197054025800406,false,true],["goLine",157.21166858172484,649.4598878703586,0.6218644200400203,false,false],["goLine",158.60583429086242,659.2299439351793,0.5912056475200101,false,true],["goLine",160.3029171454312,669.1149719675897,0.575876261260005,false,false],["goLine",162.1514585727156,679.0574859837948,0.4495592243800025,false,true],["goLine",164.57572928635778,689.0287429918974,0.38640070594000125,false,false],["goLine",167.2878646431789,699.0143714959487,0.3474972279700006,false,true],["goLine",171.14393232158943,709.0071857479743,0.3280454889850003,false,false],["goLine",176.07196616079472,719.5035928739871,0.40865165074250015,false,true],["goLine",182.03598308039736,730.7517964369936,0.4489547316212501,false,false],["goLine",189.0179915401987,742.3758982184968,0.515492990810625,false,true],["goLine",197.00899577009935,754.6879491092484,0.5487621204053126,false,false],["goLine",205.50449788504966,766.8439745546242,0.5473302789526563,false,true],["goLine",214.75224894252483,778.9219872773122,0.5466143582263281,false,true],["goLine",224.87612447126241,790.4609936386561,0.546256397863164,false,false],["goLine",235.4380622356312,800.730496819328,0.436702417681582,false,false],["endLine"],["start",268,654,0.002015625],["goLine",270.5,661.5,0.31692578125,false,true],["goLine",274.75,673.75,0.47438085937499996,false,false],["goLine",279.875,689.875,0.5701982421875,false,true],["goLine",285.9375,708.4375,0.61810693359375,false,false],["goLine",293.46875,727.71875,0.639131591796875,false,true],["goLine",302.734375,747.359375,0.6496439208984375,false,false],["goLine",312.8671875,765.6796875,0.6055836791992187,false,true],["goLine",324.93359375,782.83984375,0.5835535583496094,false,true],["goLine",337.966796875,797.919921875,0.5725384979248047,false,false],["goLine",352.9833984375,811.4599609375,0.5016012802124024,false,true],["goLine",369.49169921875,822.22998046875,0.4661326713562012,false,false],["goLine",387.245849609375,831.114990234375,0.4234960231781006,false,true],["goLine",406.1229248046875,838.0574951171875,0.4021776990890503,false,false],["goLine",426.06146240234375,842.5287475585938,0.38858884954452516,false,true],["goLine",446.5307312011719,845.2643737792969,0.38179442477226255,false,false],["goLine",467.76536560058594,846.6321868896484,0.3935339311361313,false,true],["goLine",488.38268280029297,846.8160934448242,0.3994036843180656,false,false],["goLine",508.6913414001465,845.9080467224121,0.4457955921590328,false,true],["goLine",528.8456707000732,844.454023361206,0.46899154607951643,false,true],["goLine",548.9228353500366,842.727011680603,0.4805895230397582,false,false],["goLine",567.9614176750183,841.3635058403015,0.4898064802698791,false,true],["goLine",585.9807088375092,840.1817529201508,0.4944149588849396,false,false],["goLine",603.9903544187546,839.5908764600754,0.4757231044424698,false,true],["goLine",620.9951772093773,840.2954382300377,0.4663771772212349,false,false],["goLine",637.4975886046886,842.6477191150188,0.4104346823606174,false,true],["goLine",653.7487943023443,846.3238595575094,0.3824634349303087,false,false],["goLine",669.3743971511722,851.1619297787547,0.2542199987151543,false,true],["goLine",684.1871985755861,856.5809648893774,0.19009828060757716,false,false],["endLine"],["start",600,776,0.00088671875],["goLine",603.5,775.5,0.099564453125,false,false],["goLine",608.25,775.25,0.1948017578125,false,true],["goLine",613.625,776.625,0.24242041015625,false,false],["goLine",620.8125,779.3125,0.41466723632812497,false,true],["goLine",629.90625,783.65625,0.5007906494140625,false,true],["goLine",640.953125,788.828125,0.5438523559570312,false,false],["goLine",653.4765625,795.4140625,0.6020043029785156,false,true],["goLine",667.23828125,802.20703125,0.6310802764892578,false,false],["goLine",681.619140625,808.603515625,0.6524542007446289,false,true],["goLine",696.8095703125,813.8017578125,0.6631411628723145,false,false],["goLine",712.90478515625,817.90087890625,0.6650666751861573,false,true],["goLine",729.452392578125,819.950439453125,0.6660294313430786,false,false],["goLine",746.2261962890625,819.9752197265625,0.6640694031715393,false,true],["goLine",763.6130981445312,817.4876098632812,0.6630893890857696,false,false],["goLine",781.8065490722656,812.2438049316406,0.6660173507928848,false,true],["goLine",799.9032745361328,804.6219024658203,0.6674813316464424,false,true],["goLine",817.4516372680664,794.3109512329102,0.6682133220732211,false,false],["goLine",834.2258186340332,781.6554756164551,0.6724855672866106,false,true],["goLine",850.6129093170166,767.8277378082275,0.6746216898933053,false,false],["goLine",866.3064546585083,752.4138689041138,0.6795960011966526,false,true],["goLine",881.1532273292542,736.7069344520569,0.6820831568483263,false,false],["goLine",895.0766136646271,721.3534672260284,0.6838150159241632,false,true],["goLine",908.0383068323135,706.1767336130142,0.6846809454620816,false,false],["goLine",920.0191534161568,692.0883668065071,0.6421451602310408,false,true],["goLine",930.0095767080784,679.5441834032536,0.6208772676155204,false,false],["goLine",938.5047883540392,668.7720917016268,0.4735245713077602,false,false],["endLine"],["start",918,629,0.00033593750000000003],["goLine",920.5,626.5,0.11051953125,false,true],["goLine",925.25,622.25,0.165611328125,false,false],["goLine",931.125,617.125,0.2932548828125,false,true],["goLine",937.5625,611.0625,0.35707666015625,false,true],["goLine",944.78125,604.53125,0.38898754882812503,false,false],["goLine",952.390625,597.765625,0.4381461181640625,false,true],["goLine",960.1953125,590.8828125,0.46272540283203123,false,false],["goLine",967.59765625,583.94140625,0.4852689514160156,false,true],["goLine",974.298828125,576.470703125,0.4965407257080078,false,false],["goLine",980.1494140625,568.2353515625,0.506571144104004,false,true],["goLine",985.07470703125,559.11767578125,0.511586353302002,false,false],["goLine",988.537353515625,548.558837890625,0.507746301651001,false,true],["goLine",990.2686767578125,537.2794189453125,0.5058262758255005,false,false],["goLine",991.1343383789062,525.1397094726562,0.5019365754127503,false,true],["goLine",990.0671691894531,512.0698547363281,0.49999172520637514,false,false],["goLine",987.5335845947266,498.03492736816406,0.5488239876031875,false,true],["goLine",983.2667922973633,484.01746368408203,0.5732401188015938,false,true],["goLine",978.1333961486816,470.008731842041,0.5854481844007968,false,false],["goLine",972.0666980743408,456.0043659210205,0.6193842484503984,false,true],["goLine",965.5333490371704,442.50218296051025,0.6363522804751992,false,false],["goLine",958.2666745185852,429.7510914802551,0.6516722339875995,false,true],["goLine",951.1333372592926,417.87554574012756,0.6593322107437998,false,false],["goLine",944.5666686296463,406.4377728700638,0.6631621991218999,false,true],["goLine",938.7833343148232,395.2188864350319,0.6650771933109499,false,false],["goLine",933.8916671574116,384.60944321751595,0.664081565405475,false,true],["goLine",929.9458335787058,374.804721608758,0.6635837514527375,false,false],["goLine",927.9729167893529,364.902360804379,0.6584520319763687,false,true],["goLine",926.9864583946764,354.9511804021895,0.6558861722381844,false,true],["goLine",927.4932291973382,345.47559020109475,0.6546032423690922,false,false],["goLine",928.7466145986691,335.7377951005474,0.6275945899345461,false,true],["goLine",931.3733072993346,326.3688975502737,0.614090263717273,false,false],["goLine",934.1866536496673,317.18444877513684,0.4173966943586365,false,true],["goLine",937.5933268248336,308.5922243875684,0.31904990967931823,false,false],["endLine"],["start",937,247,0.0020078125],["goLine",935,243,0.32912890625,false,false],["goLine",930.5,237.5,0.545912109375,false,true],["goLine",924.75,231.25,0.6543037109375001,false,false],["goLine",917.375,225.125,0.71972998046875,false,true],["goLine",909.1875,219.0625,0.752443115234375,false,true],["goLine",900.59375,213.53125,0.7687996826171875,false,false],["goLine",890.796875,208.765625,0.7662357788085937,false,true],["goLine",880.3984375,205.3828125,0.7649538269042968,false,false],["goLine",869.69921875,203.19140625,0.5821839447021484,false,true],["goLine",858.849609375,203.095703125,0.4907990036010742,false,false],["endLine"]]'));
        }, 400);*/

        let textToolSettings = {
            size: 20,
            align: 'left',
            isBold: false,
            isItalic: false,
            font: 'sans-serif',
            opacity: 1
        };

        var pcCanvasWorkspace = new BV.PcCanvasWorkspace({
            pcCanvas: pcCanvas,
            width: Math.max(0, width - toolwidth),
            height: height,
            onDraw: drawEventChain.chainIn,
            onFill: function(canvasX, canvasY) {
                let layerIndex = pcCanvas.getLayerIndex(currentLayerCtx.canvas);
                pcCanvas.floodFill(layerIndex, canvasX, canvasY, pcColorSlider.getColor(), fillUi.getOpacity(), fillUi.getTolerance(), fillUi.getSample(), fillUi.getGrow(), fillUi.getContiguous());
                pcCanvasWorkspace.requestFrame();
            },
            onText: function(canvasX, canvasY, angleRad) {
                if (KLEKI.isInDialog > 0) {
                    return;
                }

                BV.textToolDialog({
                    pcCanvas: pcCanvas,
                    layerIndex: pcCanvas.getLayerIndex(currentLayerCtx.canvas),
                    x: canvasX,
                    y: canvasY,
                    angleRad: angleRad,
                    color: pcColorSlider.getColor(),
                    secondaryColor: pcColorSlider.getSecondaryRGB(),
                    size: textToolSettings.size,
                    align: textToolSettings.align,
                    isBold: textToolSettings.isBold,
                    isItalic: textToolSettings.isItalic,
                    font: textToolSettings.font,
                    opacity: textToolSettings.opacity,
                    onConfirm: function(val) {

                        let colorRGBA = val.color;
                        colorRGBA.a = val.opacity;

                        textToolSettings.size = val.size;
                        textToolSettings.align = val.align;
                        textToolSettings.isBold = val.isBold;
                        textToolSettings.isItalic = val.isItalic;
                        textToolSettings.font = val.font;
                        textToolSettings.opacity = val.opacity;

                        let layerIndex = pcCanvas.getLayerIndex(currentLayerCtx.canvas);
                        pcCanvas.text(layerIndex, {
                            textStr: val.textStr,
                            x: val.x,
                            y: val.y,
                            angleRad: angleRad,
                            color: BV.ColorConverter.toRgbaStr(colorRGBA),
                            size: val.size,
                            align: val.align,
                            isBold: val.isBold,
                            isItalic: val.isItalic,
                            font: val.font
                        });
                        pcCanvasWorkspace.requestFrame();
                    }
                });

            },
            onPick: function(rgbObj, isDragDone) {
                brushSettingService.setColor(rgbObj);
                if(isDragDone) {
                    pcColorSlider.pickingDone();
                    pcCanvasWorkspace.setMode(toolspaceToolRow.getActive());
                }
            },
            onViewChange: function(viewChangeObj) {

                if(viewChangeObj.changed.includes('scale')) {
                    let outObj = {
                        type: 'transform',
                        scale: viewChangeObj.scale,
                        angleDeg: viewChangeObj.angle * 180 / Math.PI
                    };
                    output.out(outObj);
                }

                toolspaceToolRow.setEnableZoomIn(viewChangeObj.scale !== pcCanvasWorkspace.getMaxScale());
                toolspaceToolRow.setEnableZoomOut(viewChangeObj.scale !== pcCanvasWorkspace.getMinScale());

                handUi.update(viewChangeObj.scale, viewChangeObj.angle * 180 / Math.PI);
            },
            onUndo: function() {
                if(BV.pcLog.canUndo()) {
                    output.out('Undo', true);
                    execUndo();
                }
            },
            onRedo: function() {
                if(BV.pcLog.canRedo()) {
                    output.out('Redo', true);
                    execRedo();
                }
            }
        });
        var keyListener = new BV.KeyListener({
            onDown: function(keyStr, event, comboStr) {
                if (KLEKI.isInDialog > 0) {
                    return;
                }
                if(document.activeElement && document.activeElement.tagName === 'INPUT') {
                    return;
                }

                if(comboStr === 'plus') {
                    pcCanvasWorkspace.zoomByStep(keyListener.isPressed('shift') ? 1/8 : 1/2);
                }
                if(comboStr === 'minus') {
                    pcCanvasWorkspace.zoomByStep(keyListener.isPressed('shift') ? -1/8 : -1/2);
                }
                if(comboStr === 'home') {
                    pcCanvasWorkspace.fitView();
                }
                if(comboStr === 'end') {
                    pcCanvasWorkspace.resetView(true);
                }
                if (['ctrl+z', 'cmd+z'].includes(comboStr)) {//keyStr === 'z' && ctrlOrCmdPressed) {
                    event.preventDefault();
                    event.returnValue = false;
                    if (!lineSanitizer.getIsDrawing()) {
                        execUndo();
                    }
                }
                if (['ctrl+y', 'cmd+y'].includes(comboStr)) {//keyStr === 'y' && ctrlOrCmdPressed) {
                    event.preventDefault();
                    event.returnValue = false;
                    if (!lineSanitizer.getIsDrawing()) {
                        execRedo();
                    }
                }
                if (['ctrl+s', 'cmd+s'].includes(comboStr)) {//keyStr === 's' && ctrlOrCmdPressed) {
                    event.preventDefault();
                    event.returnValue = false;
                    if(!lineSanitizer.getIsDrawing()) {
                        saveImageToComputer();
                    }
                }
                if (['ctrl+c', 'cmd+c'].includes(comboStr)) {//keyStr === 'c' && ctrlOrCmdPressed) {
                    event.preventDefault();
                    event.returnValue = false;
                    if(!lineSanitizer.getIsDrawing()) {
                        copyToClipboard();
                    }
                }
                if (['ctrl+a', 'cmd+a'].includes(comboStr)) {//keyStr === 'a' && ctrlOrCmdPressed) {//prevent accidental text selection
                    event.preventDefault();
                    event.returnValue = false;
                }

                if(!lineSanitizer.getIsDrawing()) {

                    if(keyListener.comboOnlyContains(['left', 'right', 'up', 'down'])) {
                        if (keyStr === 'left') {
                            pcCanvasWorkspace.translateView(1, 0);
                        }
                        if (keyStr === 'right') {
                            pcCanvasWorkspace.translateView(-1, 0);
                        }
                        if (keyStr === 'up') {
                            pcCanvasWorkspace.translateView(0, 1);
                        }
                        if (keyStr === 'down') {
                            pcCanvasWorkspace.translateView(0, -1);
                        }
                    }


                    if(['r+left','r+right'].includes(comboStr)) {
                        if (keyStr === 'left') {
                            pcCanvasWorkspace.setAngle(-15, true);
                            handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
                        }
                        if (keyStr === 'right') {
                            pcCanvasWorkspace.setAngle(15, true);
                            handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
                        }
                    }


                    if (comboStr === 'sqbr_open') {
                        currentBrush.decreaseSize(0.03 / pcCanvasWorkspace.getScale());
                    }
                    if (comboStr === 'sqbr_close') {
                        currentBrush.increaseSize(0.03 / pcCanvasWorkspace.getScale());
                    }
                    if (comboStr === 'enter') {
                        pcCanvas.layerFill(pcCanvas.getLayerIndex(currentLayerCtx.canvas), pcColorSlider.getColor());
                    }
                    if (['delete', 'backspace'].includes(comboStr)) {
                        var layerIndex = pcCanvas.getLayerIndex(currentLayerCtx.canvas);
                        if (layerIndex === 0 && !brushUiObj.eraser.getIsTransparentBg()) {
                            pcCanvas.layerFill(layerIndex, {r: 255, g: 255, b: 255}, 'source-in');
                        } else {
                            pcCanvas.clearLayer(layerIndex);
                        }
                    }
                    if (comboStr === 'e') {
                        event.preventDefault();
                        pcCanvasWorkspace.setMode('draw');
                        toolspaceToolRow.setActive('draw');
                        updateMainTabVisibility();
                        brushTabRow.open('eraser');
                    }
                    if (comboStr === 'b') {
                        event.preventDefault();
                        pcCanvasWorkspace.setMode('draw');
                        toolspaceToolRow.setActive('draw');
                        updateMainTabVisibility();
                        brushTabRow.open(lastNonEraserBrushId);
                    }
                    if (comboStr === 'g') {
                        event.preventDefault();
                        pcCanvasWorkspace.setMode('fill');
                        toolspaceToolRow.setActive('fill');
                        updateMainTabVisibility();
                    }
                    if (comboStr === 't') {
                        event.preventDefault();
                        pcCanvasWorkspace.setMode('text');
                        toolspaceToolRow.setActive('text');
                        updateMainTabVisibility();
                    }
                    if (comboStr === 'x') {
                        event.preventDefault();
                        pcColorSlider.swapColors();
                    }
                }



            },
            onUp: function(keyStr) {
                var endWheeling = false;
                if(keyStr === 'alt') {//what is this for?
                    e.returnValue = false;
                }
            }
        });


        //UNDO REDO
        function execUndo() {
            if (!BV.pcLog.canUndo()) {// || workspace.isPainting()) {
                return;
            }
            var startTime = performance.now();
            var actions = BV.pcLog.undo();
            BV.pcLog.pause();
            var oldSize = {w: pcCanvas.getWidth(), h: pcCanvas.getHeight()};
            pcCanvas.copy(initState.canvas);
            var layerIndex = initState.focus;
            currentLayerCtx = pcCanvas.getLayerContext(layerIndex);
            var brushes = {};
            for (var b in BV.BrushLib) {
                if (BV.BrushLib.hasOwnProperty(b)) {
                    brushes[b] = new BV.BrushLib[b]();
                    brushes[b].setContext(currentLayerCtx);
                    brushes[b].setDebug('is_undo');
                }
            }
            brushes.sketchy.setSeed(initState.brushes.sketchy.getSeed());
            brushes.smoothBrush.setRequestCanvas(function () {
                return pcCanvas;
            });
            for (var i = 0; i < actions.length; i++) {
                (function (i) {
                    if (actions[i].tool[0] === "brush") {
                        var b = brushes[actions[i].tool[1]];
                        if (actions[i].actions) {
                            for (var e = 0; e < actions[i].actions.length; e++) {
                                var p = actions[i].actions[e].params;
                                b[actions[i].actions[e].action].apply(b, p);
                            }
                        } else {
                            var p = actions[i].params;
                            b[actions[i].action].apply(b, p);
                        }
                    } else if (actions[i].tool[0] === "canvas") {
                        var p = actions[i].params;
                        var id = pcCanvas[actions[i].action].apply(pcCanvas, p);
                        if (typeof id === typeof 123) {
                            layerIndex = id;
                            currentLayerCtx = pcCanvas.getLayerContext(layerIndex);
                            for (var b in brushes) {
                                if (brushes.hasOwnProperty(b)) {
                                    brushes[b].setContext(currentLayerCtx);
                                }
                            }
                        }
                    } else if (actions[i].tool[0] === "filter") {
                        var p = [{
                            context: currentLayerCtx,
                            canvas: pcCanvas,
                            input: actions[i].params[0].input,
                            logger: {
                                add: function () {
                                }, pause: function () {
                                }
                            }
                        }];
                        BV.FilterLib[actions[i].tool[1]][actions[i].action].apply(null, p);
                    } else if (actions[i].tool[0] === "misc" && actions[i].action === "focusLayer") {
                        layerIndex = actions[i].params[0];
                        currentLayerCtx = pcCanvas.getLayerContext(actions[i].params[0]);
                        for (var b in brushes) {
                            if (brushes.hasOwnProperty(b)) {
                                brushes[b].setContext(currentLayerCtx);
                            }
                        }
                    } else if (actions[i].tool[0] === "misc" && actions[i].action === "importImage") {
                        var id = pcCanvas.addLayer();
                        if (typeof id === typeof 123) {
                            layerIndex = id;
                            currentLayerCtx = pcCanvas.getLayerContext(layerIndex);
                            for (var b in brushes) {
                                if (brushes.hasOwnProperty(b)) {
                                    brushes[b].setContext(currentLayerCtx);
                                }
                            }
                        }
                        currentLayerCtx.drawImage(actions[i].params[0], 0, 0);
                    }
                })(i);
            }
            if (oldSize.w !== pcCanvas.getWidth() || oldSize.h !== pcCanvas.getHeight()) {
                pcCanvasWorkspace.resetView();
                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
            }
            layerManager.update(layerIndex);
            layerPreview.setLayer(pcCanvas.getLayer(layerIndex));
            brushUiObj.sketchy.setSeed(brushes.sketchy.getSeed());
            currentBrush.setContext(currentLayerCtx);
            pcCanvasWorkspace.setLastDrawEvent(null);

            BV.pcLog.pause(false);
        }

        function execRedo() {
            if (!BV.pcLog.canRedo()) { // || workspace.isPainting()) {
                return;
            }
            var actions = BV.pcLog.redo();
            BV.pcLog.pause();
            var oldSize = {w: pcCanvas.getWidth(), h: pcCanvas.getHeight()};
            var layerIndex;
            var brushes = {};
            for (var b in BV.BrushLib) {
                if (BV.BrushLib.hasOwnProperty(b)) {
                    brushes[b] = new BV.BrushLib[b]();
                    brushes[b].setContext(currentLayerCtx);
                }
            }
            brushes.smoothBrush.setRequestCanvas(function () {
                return pcCanvas;
            });
            brushes.sketchy.setSeed(brushUiObj.sketchy.getSeed());
            for (var i = 0; i < actions.length; i++) {
                (function (i) {
                    if (actions[i].tool[0] === "brush") {
                        var b = brushes[actions[i].tool[1]];
                        if (actions[i].actions) {
                            for (var e = 0; e < actions[i].actions.length; e++) {
                                var p = actions[i].actions[e].params;
                                b[actions[i].actions[e].action].apply(b, p);
                            }
                        } else {
                            var p = actions[i].params;
                            b[actions[i].action].apply(b, p);
                        }
                    } else if (actions[i].tool[0] === "canvas") {
                        var p = actions[i].params;
                        var id = pcCanvas[actions[i].action].apply(pcCanvas, p);
                        if (typeof id === typeof 123) {
                            layerIndex = id;
                            currentLayerCtx = pcCanvas.getLayerContext(layerIndex);
                            for (var b in brushes) {
                                if (brushes.hasOwnProperty(b)) {
                                    brushes[b].setContext(currentLayerCtx);
                                }
                            }
                        }
                    } else if (actions[i].tool[0] === "filter") {
                        var p = [{
                            context: currentLayerCtx,
                            canvas: pcCanvas,
                            input: actions[i].params[0].input,
                            logger: {
                                add: function () {
                                }, pause: function () {
                                }
                            }
                        }];
                        BV.FilterLib[actions[i].tool[1]][actions[i].action].apply(null, p);
                    } else if (actions[i].tool[0] === "misc" && actions[i].action === "focusLayer") {
                        layerIndex = actions[i].params[0];
                        currentLayerCtx = pcCanvas.getLayerContext(actions[i].params[0]);
                        for (var b in brushes) {
                            if (brushes.hasOwnProperty(b)) {
                                brushes[b].setContext(currentLayerCtx);
                            }
                        }
                    } else if (actions[i].tool[0] === "misc" && actions[i].action === "importImage") {
                        var id = pcCanvas.addLayer();
                        if (typeof id === typeof 123) {
                            layerIndex = id;
                            currentLayerCtx = pcCanvas.getLayerContext(layerIndex);
                            for (var b in brushes) {
                                if (brushes.hasOwnProperty(b)) {
                                    brushes[b].setContext(currentLayerCtx);
                                }
                            }
                        }
                        currentLayerCtx.drawImage(actions[i].params[0], 0, 0);
                    }
                })(i);
            }

            if (oldSize.w !== pcCanvas.getWidth() || oldSize.h !== pcCanvas.getHeight()) {
                pcCanvasWorkspace.resetView();
                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
            }
            var currentLayerIndex = pcCanvas.getLayerIndex(currentLayerCtx.canvas);
            layerManager.update(currentLayerIndex);
            layerPreview.setLayer(pcCanvas.getLayer(currentLayerIndex));
            brushUiObj.sketchy.setSeed(brushes.sketchy.getSeed());
            currentBrush.setContext(currentLayerCtx);
            pcCanvasWorkspace.setLastDrawEvent(null);
            BV.pcLog.pause(false);
        }

        /**
         *
         * @param importedImage - convertedPsd | {type: 'image', width: number, height: number, canvas: image | canvas}
         * @param optionStr? - 'default' | 'layer' | 'image'
         */
        function importFinishedLoading(importedImage, optionStr) {

            if (!importedImage || isNaN(importedImage.width) || isNaN(importedImage.height) || importedImage.width <= 0 || importedImage.height <= 0) {
                BV.popup({
                    target: pcWeb,
                    type: "error",
                    message: "Couldn't load image. File might be corrupted.",
                    buttons: ["Ok"],
                    callback: function (result) {
                    }
                });
                return;
            }

            function getResizedDimensions(width, height) {
                var w = parseInt(width);
                var h = parseInt(height);
                if (w > klekiMaxCanvasSize) {
                    h = klekiMaxCanvasSize / w * h;
                    w = klekiMaxCanvasSize;
                }
                if (h > klekiMaxCanvasSize) {
                    w = klekiMaxCanvasSize / h * w;
                    h = klekiMaxCanvasSize;
                }
                w = parseInt(w);
                h = parseInt(h);
                return {
                    width: w,
                    height: h
                }
            }

            function importAsImage(canvas) {
                let resizedDimensions = getResizedDimensions(canvas.width, canvas.height);

                //resize first
                let tempCanvas = BV.createCanvas(canvas.width, canvas.height);
                let tempCanvasCtx = tempCanvas.getContext('2d');
                tempCanvasCtx.drawImage(canvas, 0, 0);

                BV.resizeCanvas(tempCanvas, resizedDimensions.width, resizedDimensions.height);

                pcCanvas.reset({
                    width: resizedDimensions.width,
                    height: resizedDimensions.height,
                    image: tempCanvas
                });

                layerManager.update(0);
                setCurrentLayer(pcCanvas.getLayer(0));
                pcCanvasWorkspace.resetView();
                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());

                isFirstImage = false;
            }

            /**
             *
             * @param convertedPsdObj - if flattened then without layerArr
             * @param cropObj? - {x: number, y: number, width: number, height: number}
             */
            function importAsImagePsd(convertedPsdObj, cropObj) {

                // crop
                function crop(targetCanvas, cropCanvas, cropObj) {
                    cropCanvas.width = cropCanvas.width;
                    cropCanvas.getContext('2d').drawImage(targetCanvas, -cropObj.x, -cropObj.y);
                    targetCanvas.width = cropObj.width;
                    targetCanvas.height = cropObj.height;
                    targetCanvas.getContext('2d').drawImage(cropCanvas, 0, 0);
                }
                if (cropObj && (cropObj.width !== convertedPsdObj.width ||cropObj.height !== convertedPsdObj.height)) {
                    let cropCanvas = BV.createCanvas(cropObj.width, cropObj.height);
                    convertedPsdObj.width = cropObj.width;
                    convertedPsdObj.height = cropObj.height;

                    if (!convertedPsdObj.layerArr) {
                        crop(convertedPsdObj.canvas, cropCanvas, cropObj);
                    }
                    if (convertedPsdObj.layerArr) {
                        for (let i = 0; i < convertedPsdObj.layerArr.length; i++) {
                            let item = convertedPsdObj.layerArr[i];
                            crop(item.canvas, cropCanvas, cropObj);
                        }
                    }
                }

                // resize
                let resizedDimensions = getResizedDimensions(convertedPsdObj.width, convertedPsdObj.height);
                convertedPsdObj.width = resizedDimensions.width;
                convertedPsdObj.height = resizedDimensions.height;
                if (!convertedPsdObj.layerArr) {
                    BV.resizeCanvas(convertedPsdObj.canvas, convertedPsdObj.width, convertedPsdObj.height);
                }
                if (convertedPsdObj.layerArr) {
                    for (let i = 0; i < convertedPsdObj.layerArr.length; i++) {
                        let item = convertedPsdObj.layerArr[i];
                        BV.resizeCanvas(item.canvas, convertedPsdObj.width, convertedPsdObj.height);
                    }
                }

                let layerIndex;
                if (convertedPsdObj.layerArr) {
                    layerIndex = pcCanvas.reset({
                        width: convertedPsdObj.width,
                        height: convertedPsdObj.height,
                        layerArr: convertedPsdObj.layerArr
                    });
                } else {
                    layerIndex = pcCanvas.reset({
                        width: convertedPsdObj.width,
                        height: convertedPsdObj.height,
                        image: convertedPsdObj.canvas
                    });
                }
                layerManager.update(layerIndex);
                setCurrentLayer(pcCanvas.getLayer(layerIndex));
                pcCanvasWorkspace.resetView();
                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());

                isFirstImage = false;
            }

            function importAsLayer(canvas) {
                BV.showImportAsLayerDialog({
                    target: pcWeb,
                    pcCanvas: pcCanvas,
                    importImage: canvas,
                    callback: function(transformObj) {
                        if (!transformObj) {
                            return;
                        }

                        BV.pcLog.pause();
                        pcCanvas.addLayer();
                        var layers = pcCanvas.getLayers();
                        var activeLayerIndex = layers.length - 1;
                        var activeLayerContext = pcCanvas.getLayerContext(activeLayerIndex);
                        BV.drawTransformedImageOnCanvas(activeLayerContext.canvas, canvas, transformObj);
                        setCurrentLayer(pcCanvas.getLayer(activeLayerIndex));
                        layerManager.update(activeLayerIndex);

                        BV.pcLog.pause(false);

                        BV.pcLog.add({
                            tool: ["misc"],
                            action: "importImage",
                            params: [BV.copyCanvas(activeLayerContext.canvas)]
                        });
                    }
                });
            }


            if(optionStr === 'default' || !optionStr) {
                BV.showImportImageDialog({
                    image: importedImage,
                    target: pcWeb,
                    maxSize: klekiMaxCanvasSize,
                    callback: function(res) {
                        if (res.type === 'as-image') {
                            importAsImage(res.image);
                        } else if (res.type === 'as-image-psd') {
                            importAsImagePsd(res.image, res.cropObj);
                        } else if (res.type === 'as-layer') {
                            importAsLayer(res.image);
                        } else if (res.type === 'cancel') {
                            // nothing to do
                        }
                    }
                });
            }

            if(optionStr === 'layer') {
                importAsLayer(importedImage.canvas);
            }
            if(optionStr === 'image') {
                if (importedImage.type === 'psd') {
                    importAsImagePsd(importedImage);
                } else {
                    importAsImage(importedImage.canvas);
                }
            }

        }

        function handlePaste(e) {
            if (KLEKI.isInDialog > 0) {
                return;
            }

            function retrieveImageFromClipboardAsBlob(pasteEvent, callback) {
                if (pasteEvent.clipboardData == false) {
                    if (typeof (callback) == "function") {
                        callback(undefined);
                    }
                }

                var items = pasteEvent.clipboardData.items;

                if (items == undefined) {
                    if (typeof (callback) == "function") {
                        callback(undefined);
                    }
                }

                for (var i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") == -1) {
                        continue;
                    }
                    var blob = items[i].getAsFile();

                    if (typeof (callback) == "function") {
                        callback(blob);
                    }
                }
            }

            e.stopPropagation();
            e.preventDefault();

            retrieveImageFromClipboardAsBlob(e, function (imageBlob) {
                // If there's an image, display it in the canvas
                if (imageBlob) {
                    var img = new Image();
                    img.onload = function () {
                        importFinishedLoading({
                            type: 'image',
                            width: img.width,
                            height: img.height,
                            canvas: img
                        }, 'default');
                    };
                    var URLObj = window.URL || window.webkitURL;
                    img.src = URLObj.createObjectURL(imageBlob);
                }
            });
        }

        function handleFileSelect(files, optionStr) {

            for (var i = 0, file; file = files[i]; i++) {
                var extension = file.name.split(".");
                extension = extension[extension.length - 1].toLowerCase();
                if (extension === "psd") {

                    function showWarningPsdFlattened() {
                        BV.popup({
                            target: pcWeb,
                            type: "warning",
                            message: "Unsupported features. PSD had to be flattened.<br /><br />",
                            buttons: ["Ok"],
                            callback: function (result) {
                            }
                        });
                    }

                    let loaderSizeBytes = 1024 * 1024 * 25; // 25mb
                    let maxSizeBytes = 1024 * 1024 * 1024; // 1gb
                    let maxResolution = 4096;

                    if (file.size >= maxSizeBytes) { // pretty likely to break stuff
                        BV.popup({
                            target: pcWeb,
                            type: "error",
                            message: "File too big. Unable to import.<br /><br />",
                            buttons: ["Ok"],
                            callback: function (result) {
                            }
                        });
                        continue;
                    }

                    let doShowLoader = files.length === 1 && file.size >= loaderSizeBytes;
                    let loaderIsOpen = true;
                    let closeLoader;

                    if (doShowLoader) {
                        BV.popup({
                            target: pcWeb,
                            message: "Opening file...",
                            callback: function (result) {
                                loaderIsOpen = false;
                                closeLoader = null;
                            },
                            closefunc: function (f) {
                                closeLoader = f;
                            }
                        });
                    }


                    var reader = new FileReader();
                    reader.onload = function (readerResult) {

                        if (doShowLoader && !loaderIsOpen) {
                            return;
                        }

                        try {
                            //let psd = agPsd.readPsd(readerResult.target.result, { skipLayerImageData: true, skipThumbnail: true });
                            let psd;

                            // first pass, only read metadata
                            psd = agPsd.readPsd(
                                readerResult.target.result,
                                {
                                    skipLayerImageData: true,
                                    skipThumbnail: true,
                                    skipCompositeImageData: true
                                });
                            if (psd.width > maxResolution || psd.height > maxResolution) {
                                if (closeLoader) {
                                    closeLoader();
                                }
                                BV.popup({
                                    target: pcWeb,
                                    type: "error",
                                    message: "Image exceeds maximum dimensions of "+maxResolution+" x "+maxResolution+" pixels. Unable to import."
                                            + "<br /><br />"
                                            + "Image size: " + psd.width + " x " + psd.height + ' pixels'
                                            + "<br /><br />"
                                    ,
                                    buttons: ["Ok"],
                                    callback: function (result) {
                                    }
                                });
                                return;
                            }


                            // second pass, now load actual data.
                            psd = null;

                            try {
                                psd = agPsd.readPsd(readerResult.target.result);
                            } catch (e) {
                                //console.log('failed regular psd import', e);
                            }
                            if (psd) {
                                //console.log('psd', psd);
                                let convertedPsd = BV.PSD.readPsd(psd);
                                //console.log('converted', convertedPsd);
                                if (optionStr === 'image' && convertedPsd.error) {
                                    showWarningPsdFlattened();
                                }

                                if (closeLoader) {
                                    closeLoader();
                                }
                                importFinishedLoading(convertedPsd, optionStr);
                            } else {
                                psd = agPsd.readPsd(readerResult.target.result, { skipLayerImageData: true, skipThumbnail: true });
                                if (optionStr === 'image') {
                                    showWarningPsdFlattened();
                                }

                                if (closeLoader) {
                                    closeLoader();
                                }
                                importFinishedLoading({
                                    type: 'psd',
                                    width: psd.width,
                                    height: psd.height,
                                    canvas: psd.canvas,
                                    error: true
                                }, optionStr);
                            }


                        } catch (e) {
                            if (closeLoader) {
                                closeLoader();
                            }
                            //console.log(e);
                            BV.popup({
                                target: pcWeb,
                                type: "error",
                                message: "Failed to load PSD.<br /><br />",
                                buttons: ["Ok"],
                                callback: function (result) {
                                }
                            });
                        }

                    };
                    reader.readAsArrayBuffer(file);

                } else if (file.type.match('image.*')) {
                    (function (f) {
                        window.URL = window.URL || window.webkitURL;
                        var url = window.URL.createObjectURL(f);
                        var im = new Image();
                        im.src = url;
                        BV.loadImage(im, function () {
                            importFinishedLoading({
                                type: 'image',
                                width: im.width,
                                height: im.height,
                                canvas: im
                            }, optionStr);
                        });
                    })(file);
                }


            }
        }

        let pcImageDropper = new BV.PcImageDropper({
            target: document.body,
            onDrop: function(files, optionStr) {
                if (KLEKI.isInDialog > 0) {
                    return;
                }
                handleFileSelect(files, optionStr);
            },
            enabledTest: function() {
                return !KLEKI.isInDialog;
            }
        });

        BV.addEventListener(window, 'paste', handlePaste, false);
        var brushUiObj = {};

        // create brush UIs
        for (var b in BV.BrushLibUI) {
            if (BV.BrushLibUI.hasOwnProperty(b)) {
                let ui = new BV.BrushLibUI[b].Ui({
                    onSizeChange: sizeWatcher,
                    onOpacityChange: function(opacity) {
                        brushSettingService.emitOpacity(opacity);
                    }
                });
                brushUiObj[b] = ui;
                ui.getElement().style.padding = 10 + 'px';
                if (brushUiObj[b].setRequestCanvas) {
                    brushUiObj[b].setRequestCanvas(function () {
                        return pcCanvas;
                    });
                }
            }
        }


        BV.css(div, {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        });

        let output = new BV.Output();

        var toolspace = document.createElement("div");
        toolspace.oncontextmenu = function () {
            return false;
        };
        toolspace.onclick = BV.handleClick;
        /*BV.addEventListener(toolspace, 'touchend', function(e) {
            e.preventDefault();
            return false;
        });*/


        let toolspaceCollapser = new BV.ToolspaceCollapser({
            onChange: function() {
                updateCollapse();
            }
        });
        function updateCollapse() {

            //collapser
            if (width < collapseThreshold) {
                toolspaceCollapser.getElement().style.display = 'block';

                toolspaceCollapser.setDirection(uiState);
                if (toolspaceCollapser.isOpen()) {
                    if (uiState === 'left') {
                        BV.css(toolspaceCollapser.getElement(), {
                            left: '271px',
                            right: '',
                        });
                        BV.css(pcCanvasWorkspace.getElement(), {
                            left: '271px'
                        });
                    } else {
                        BV.css(toolspaceCollapser.getElement(), {
                            left: '',
                            right: '271px'
                        });
                        BV.css(pcCanvasWorkspace.getElement(), {
                            left: '0'
                        });
                    }
                    toolspace.style.display = 'block';
                    pcCanvasWorkspace.setSize(Math.max(0, width - toolwidth), height);
                    output.setWide(false);

                } else {
                    if (uiState === 'left') {
                        BV.css(toolspaceCollapser.getElement(), {
                            left: '0',
                            right: '',
                        });
                        BV.css(pcCanvasWorkspace.getElement(), {
                            left: '0'
                        });
                    } else {
                        BV.css(toolspaceCollapser.getElement(), {
                            left: '',
                            right: '0'
                        });
                        BV.css(pcCanvasWorkspace.getElement(), {
                            left: '0'
                        });
                    }
                    toolspace.style.display = 'none';
                    pcCanvasWorkspace.setSize(Math.max(0, width), height);
                    output.setWide(true);

                }

            } else {
                toolspaceCollapser.getElement().style.display = 'none';
                if (uiState === 'left') {
                    BV.css(pcCanvasWorkspace.getElement(), {
                        left: '271px'
                    });
                } else {
                    BV.css(pcCanvasWorkspace.getElement(), {
                        left: '0'
                    });
                }
                toolspace.style.display = 'block';
                pcCanvasWorkspace.setSize(Math.max(0, width - toolwidth), height);
                output.setWide(false);

            }
        }
        updateCollapse();

        function updateUi() {
            if (uiState === 'left') {
                BV.css(toolspace, {
                    left: 0,
                    right: '',
                    borderLeft: 'none',
                    borderRight: '1px solid rgb(135, 135, 135)'
                });
                BV.css(pcCanvasWorkspace.getElement(), {
                    left: '271px'
                });
            } else {
                BV.css(toolspace, {
                    left: '',
                    right: 0,
                    borderLeft: '1px solid rgb(135, 135, 135)',
                    borderRight: 'none'
                });
                BV.css(pcCanvasWorkspace.getElement(), {
                    left: '0'
                });
            }
            output.setUiState('' + uiState);
            layerPreview.setUiState('' + uiState);
            layerManager.setUiState('' + uiState);
            updateCollapse();
        }



        let overlayToolspace;
        setTimeout(function() {
            overlayToolspace = new BV.OverlayToolspace({
                enabledTest: function() {
                    return !KLEKI.isInDialog && !lineSanitizer.getIsDrawing();
                },
                brushSettingService: brushSettingService
            });
            div.appendChild(overlayToolspace.getElement());
        }, 0);

        div.appendChild(pcCanvasWorkspace.getElement());
        div.appendChild(toolspace);
        div.appendChild(toolspaceCollapser.getElement());

        BV.css(toolspace, {
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: (toolwidth - 1) + "px",

            overflow: "hidden",
            backgroundColor: "#ddd",
            borderLeft: "1px solid rgb(135, 135, 135)",
            userSelect: 'none',
            touchAction: 'none'
        });

        let toolspaceTopRow = new BV.ToolspaceTopRow({
            onKleki: function() {
                showIframePopup('./home/', pcWeb);
            },
            onNew: function() {
                showNewImageDialog();
            },
            onImport: function() {
                fileDiv.getImportButton().click();
            },
            onSave: function() {
                saveImageToComputer();
            },
            onShare: function() {
                shareImage();
            },
            onHelp: function() {
                showIframePopup('./help/', div);
            },
        });
        BV.addClassName(toolspaceTopRow.getElement(), 'toolspace-row-shadow');
        toolspaceTopRow.getElement().style.marginBottom = '10px';
        toolspace.appendChild(toolspaceTopRow.getElement());

        let toolspaceToolRow = new BV.ToolspaceToolRow({
            onActivate: function(activeStr) {
                if(activeStr === 'draw') {
                    pcCanvasWorkspace.setMode('draw');
                } else if(activeStr === 'hand') {
                    pcCanvasWorkspace.setMode('hand');
                } else if(activeStr === 'fill') {
                    pcCanvasWorkspace.setMode('fill');
                } else if(activeStr === 'text') {
                    pcCanvasWorkspace.setMode('text');
                }
                updateMainTabVisibility();
                pcColorSlider.pickingDone();
            },
            onZoomIn: function() {
                pcCanvasWorkspace.zoomByStep(keyListener.isPressed('shift') ? 1/8 : 1/2);
            },
            onZoomOut: function() {
                pcCanvasWorkspace.zoomByStep(keyListener.isPressed('shift') ? -1/8 : -1/2);
            },
            onUndo: function() {
                execUndo();
            },
            onRedo: function() {
                execRedo();
            }
        });
        BV.pcLog.addListener(function() {
            toolspaceToolRow.setEnableUndo(BV.pcLog.canUndo());
            toolspaceToolRow.setEnableRedo(BV.pcLog.canRedo());
        });
        BV.addClassName(toolspaceToolRow.getElement(), 'toolspace-row-shadow');
        toolspace.appendChild(toolspaceToolRow.getElement());

        BV.pcLog.addListener(function (logParam) {

            //play catch up TODO: what was this for?
            if (logParam && logParam.bufferUpdate) {
                var brushes = initState.brushes;
                var actions = [logParam.bufferUpdate];
                var localCurrentLayerCtx = initState.canvas.getLayerContext(initState.focus);
                var canvas = initState.canvas;
                var layerIndex = initState.focus;
                (function (i) {
                    if (actions[i].tool[0] === "brush") {
                        var b = brushes[actions[i].tool[1]];
                        if (actions[i].actions) {
                            for (var e = 0; e < actions[i].actions.length; e++) {
                                var p = actions[i].actions[e].params;
                                b[actions[i].actions[e].action].apply(b, p);
                            }
                        } else {
                            var p = actions[i].params;
                            b[actions[i].action].apply(b, p);
                        }
                    } else if (actions[i].tool[0] === "canvas") {
                        var p = actions[i].params;
                        var id = canvas[actions[i].action].apply(canvas, p);
                        if (typeof id === typeof 123) {
                            layerIndex = id;
                            localCurrentLayerCtx = canvas.getLayerContext(layerIndex);
                            for (var b in brushes) {
                                if (brushes.hasOwnProperty(b)) {
                                    brushes[b].setContext(localCurrentLayerCtx);
                                }
                            }
                        }
                    } else if (actions[i].tool[0] === "filter") {
                        var p = [{
                            context: localCurrentLayerCtx,
                            canvas: canvas,
                            input: actions[i].params[0].input,
                            logger: {
                                add: function () {
                                }, pause: function () {
                                }
                            }
                        }];
                        BV.FilterLib[actions[i].tool[1]][actions[i].action].apply(null, p);
                    } else if (actions[i].tool[0] === "misc" && actions[i].action === "focusLayer") {
                        layerIndex = actions[i].params[0];
                        localCurrentLayerCtx = canvas.getLayerContext(actions[i].params[0]);
                        for (var b in brushes) {
                            if (brushes.hasOwnProperty(b)) {
                                brushes[b].setContext(localCurrentLayerCtx);
                            }
                        }
                    } else if (actions[i].tool[0] === "misc" && actions[i].action === "importImage") {
                        var id = canvas.addLayer();
                        if (typeof id === typeof 123) {
                            layerIndex = id;
                            localCurrentLayerCtx = canvas.getLayerContext(layerIndex);
                            for (var b in brushes) {
                                if (brushes.hasOwnProperty(b)) {
                                    brushes[b].setContext(localCurrentLayerCtx);
                                }
                            }
                        }
                        localCurrentLayerCtx.drawImage(actions[i].params[0], 0, 0);
                    }
                })(0);
                initState.focus = layerIndex;
            }
        });

        function setCurrentBrush(brushId) {
            if (brushId !== 'eraser') {
                lastNonEraserBrushId = brushId;
            }

            if(pcColorSlider) {
                if (brushId === 'eraser') {
                    pcColorSlider.enable(false);
                } else {
                    pcColorSlider.enable(true);
                }
            }

            currentBrushId = brushId;
            currentBrush = brushUiObj[brushId];
            currentBrush.setColor(currentColor);
            currentBrush.setContext(currentLayerCtx);
            pcCanvasWorkspace.setMode('draw');
            toolspaceToolRow.setActive('draw');
            updateMainTabVisibility();
        }

        function setCurrentLayer(layer) {//BrushContext(p_context) {
            currentLayerCtx = layer.context;
            currentBrush.setContext(layer.context);
            layerPreview.setLayer(layer);
        }

        function setBrushColor(p_color) {
            currentColor = p_color;
            currentBrush.setColor(p_color);
            //pcCanvasWorkspace.setMode('draw')
            //toolspaceToolRow.setActive('draw');
            //updateMainTabVisibility();
            brushSettingService.emitColor(p_color);
            pcColorSlider.pickingDone();
        }

        setCurrentBrush('defaultBrush');

        var pcColorSlider = new BV.PcColorSlider({
            width: 250,
            height: 30,
            svHeight: 100,
            startValue: new BV.RGB(0, 0, 0),
            onPick: setBrushColor
        });
        pcColorSlider.setHeight(Math.max(163, Math.min(400, height - 505)));
        pcColorSlider.setPickCallback(function (doPick) {

            if(doPick) {
                pcCanvasWorkspace.setMode('pick');
            } else {
                pcCanvasWorkspace.setMode(toolspaceToolRow.getActive());
                updateMainTabVisibility();
            }

        });
        var brushDiv = document.createElement("div");
        let colorDiv = document.createElement("div");
        BV.css(colorDiv, {
            margin: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
        });
        let toolspaceStabilizerRow = new BV.ToolspaceStabilizerRow({
            smoothing: 1,
            onSelect: function(v) {
                lineSmoothing.setSmoothing(translateSmoothing(v));
            }
        });


        brushDiv.appendChild(colorDiv);
        colorDiv.appendChild(pcColorSlider.getElement());
        colorDiv.appendChild(pcColorSlider.getOutputElement());
        colorDiv.appendChild(toolspaceStabilizerRow.getElement());

        var brushTabRow = new BV.TabRow({
            initialId: 'defaultBrush',
            useAccent: true,
            tabArr: (function () {
                var result = [];
                var counter = 0;

                function createTab(keyStr) {
                    let result = {
                        id: keyStr,
                        image: BV.BrushLibUI[keyStr].image,
                        title: BV.BrushLibUI[keyStr].tooltip,
                        onOpen: function() {
                            brushUiObj[keyStr].getElement().style.display = 'block';
                            setCurrentBrush(keyStr);
                            pcColorSlider.pickingDone();
                            brushSettingService.emitSliderConfig({
                                sizeSlider: BV.BrushLibUI[keyStr].sizeSlider,
                                opacitySlider: BV.BrushLibUI[keyStr].opacitySlider
                            });
                            sizeWatcher(brushUiObj[keyStr].getSize());
                            brushSettingService.emitOpacity(brushUiObj[keyStr].getOpacity());
                        },
                        onClose: function() {
                            brushUiObj[keyStr].getElement().style.display = 'none';
                        }
                    };
                    return result;
                }

                let keyArr = Object.keys(brushUiObj);
                for(let i = 0; i < keyArr.length; i++) {
                    result.push(createTab(keyArr[i]));
                }
                return result;
            })()
        });
        brushDiv.appendChild(brushTabRow.getElement());
        for (var b in BV.BrushLibUI) {
            if (BV.BrushLibUI.hasOwnProperty(b)) {
                brushDiv.appendChild(brushUiObj[b].getElement());
            }
        }

        let handUi = new BV.HandUi({
            scale: 1,
            angleDeg: 0,
            onReset: function() {
                pcCanvasWorkspace.resetView(true);
                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
            },
            onFit: function() {
                pcCanvasWorkspace.fitView();
                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
            },
            onAngleChange: function(angleDeg, isRelative) {
                pcCanvasWorkspace.setAngle(angleDeg, isRelative);
                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
            },
        });

        let fillUi = new BV.FillUi({
            colorSlider: pcColorSlider
        });

        let textUi = new BV.TextUi({
            colorSlider: pcColorSlider
        });

        var layerManager = new BV.pcLayerManager(pcCanvas, function (val) {
            setCurrentLayer(pcCanvas.getLayer(val));
            BV.pcLog.add({
                tool: ["misc"],
                action: "focusLayer",
                params: [val]
            });
        }, div);
        var layerPreview = new BV.LayerPreview({
            onClick: function () {
                mainTabRow.open('layers');
            }
        });
        //setTimeout(function() {
        layerPreview.setLayer(pcCanvas.getLayer(pcCanvas.getLayerIndex(currentLayerCtx.canvas)));

        //}, 500);
        function createFilterDiv() {
            var menu = document.createElement("div");

            function asyncInit() {
                let hasWebGl = BV.hasWebGl();
                //menu.style.margin = 10;
                //div.appendChild(menu);
                var filterView = false;
                var filters = BV.FilterLib;
                var buttons = [];


                function createButton(filterKey, filterArr) {
                    var button = document.createElement("button");
                    var buttonLabel = filterArr[filterKey].buttonLabel ? filterArr[filterKey].buttonLabel : filterArr[filterKey].name;
                    var name = filterArr[filterKey].name;
                    var im = '<img src="0-4-14-17641b3b230/img/' + filterArr[filterKey].icon + '" alt="' + name + '" />';
                    if (name.length > 11) {
                        name = "<span style='font-size: 12px'>" + buttonLabel + "</span>";
                    }
                    button.innerHTML = im + name;
                    button.className = "gridButton";
                    button.tabIndex = -1;
                    button.onclick = function () {

                        if (!('apply' in filterArr[filterKey])) {
                            alert('Application not fully loaded');
                            return;
                        }

                        function applyFilter(input) {
                            var filterResult = filterArr[filterKey].apply({
                                context: currentLayerCtx,
                                canvas: pcCanvas,
                                logger: BV.pcLog,
                                input: input
                            });
                            if (filterResult === false) {
                                alert("Couldn't apply the edit action");
                            }
                            if (filterArr[filterKey].updateContext === true) {
                                setCurrentLayer(pcCanvas.getLayer(layerManager.getSelected()));
                                //currentLayer = canvas.getLayerContext(layerManager.getSelected());
                                //currentBrush.setContext(currentLayer);
                            }
                            if (filterArr[filterKey].updatePos === true) {
                                pcCanvasWorkspace.resetView();
                                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
                            }
                            layerManager.update();
                        }

                        if (!filterArr[filterKey].isInstant) {
                            let secondaryColorRGB = pcColorSlider.getSecondaryRGB();
                            let filterDialog = filterArr[filterKey].getDialog({
                                context: currentLayerCtx,
                                canvas: pcCanvas,
                                maxWidth: klekiMaxCanvasSize,
                                maxHeight: klekiMaxCanvasSize,
                                currentColorRgb: {r: currentColor.r, g: currentColor.g, b: currentColor.b},
                                secondaryColorRgb: {r: secondaryColorRGB.r, g: secondaryColorRGB.g, b: secondaryColorRGB.b}
                            });

                            if (!filterDialog) {
                                return;
                                //alert('Error: could not perform action');
                                //throw('filter['+filterKey+'].getDialog returned '+filterDialog+'. ctx:' + currentLayerCtx + ' pcCanvas:' + pcCanvas);
                            }

                            let closefunc;
                            filterDialog.errorCallback = function(e) {
                                setTimeout(function() {
                                    alert('Error: could not perform action');
                                    throw(e);
                                }, 0);
                                closefunc();
                            };

                            function finishedDialog(result) {
                                if (result == "Cancel") {
                                    return;
                                }
                                let input;
                                try {
                                    input = filterDialog.getInput();// also destroys
                                } catch (e) {
                                    if(e.message.indexOf('filterDialog.getInput is not a function') !== -1) {
                                        throw 'filterDialog.getInput is not a function, filter: ' + filterArr[filterKey].name;
                                    } else {
                                        throw e;
                                    }
                                }
                                applyFilter(input);
                            }

                            let style = {};
                            if('width' in filterDialog) {
                                style.width = filterDialog.width + 'px'
                            }

                            BV.popup({
                                target: pcWeb,
                                message: "<b>" + filterArr[filterKey].name + "</b>",
                                div: filterDialog.element,
                                style: style,
                                buttons: ["Ok", "Cancel"],
                                callback: finishedDialog,
                                closefunc: function (func) {
                                    closefunc = func;
                                }
                            });
                        } else {
                            button.blur();
                            applyFilter(null);
                        }

                    }
                    buttons[buttons.length] = button;
                    return button;
                }

                function createDisabledButton(filterKey, filterArr) {
                    if (!filterArr[filterKey].webgl && !filterArr[filterKey].ieFails) {
                        return;
                    }
                    if (filterArr[filterKey].ieFails && navigator.appName !== 'Microsoft Internet Explorer') {
                        return;
                    }
                    var buttonLabel = filterArr[filterKey].buttonLabel ? filterArr[filterKey].buttonLabel : filterArr[filterKey].name;
                    var button = document.createElement("button");
                    var im = '<img style="opacity: 0.5" src="img/' + filterArr[filterKey].icon + '" />';
                    var name = filterArr[filterKey].name;
                    if (name.length > 11) {
                        name = "<span style='font-size: 12px'>" + buttonLabel + "</span>";
                    }
                    button.innerHTML = im + name;
                    button.className = "gridButton";
                    button.disabled = "disabled";
                    return button;
                }

                function addGroup(groupArr, filterArr, targetEl) {
                    for (var filterKey in filterArr) {
                        if (filterArr.hasOwnProperty[filterKey] || !groupArr.includes(filterKey)) {
                            continue;
                        }
                        if ((filterArr[filterKey].webgl && hasWebGl)
                            || (filterArr[filterKey].neededWithWebGL)
                            || (!filterArr[filterKey].webgl && !hasWebGl)
                            && !(filterArr[filterKey].ieFails && navigator.appName == 'Microsoft Internet Explorer')) {

                            targetEl.appendChild(createButton(filterKey, filterArr));

                        } else {
                            targetEl.appendChild(createDisabledButton(filterKey, filterArr));
                            filterArr[filterKey] = undefined;
                        }
                    }
                }

                var groupA = [
                    'cropExtend',
                    'flip',
                    'glPerspective',
                    'resize',
                    'rotate',
                    'transform'
                ];
                var groupB = [];
                for (var filterKey in filters) {
                    if (filters.hasOwnProperty[filterKey] || groupA.includes(filterKey)) {
                        continue;
                    }
                    groupB.push(filterKey);
                }

                addGroup(groupA, filters, menu);
                var hrEl = document.createElement("div");
                hrEl.className = "gridHr";
                menu.appendChild(hrEl);
                addGroup(groupB, filters, menu);


                if (!hasWebGl) {
                    let webglnote = BV.appendTextDiv(menu, "Some actions are disabled because WebGL isn't working.");
                    webglnote.style.margin = "10px";
                    BV.css(webglnote, {
                        fontSize: "11px",
                        color: "#555",
                        background: "#ffe",
                        padding: "10px",
                        borderRadius: "10px",
                        textAlign: "center"
                    });
                }
            }

            setTimeout(asyncInit, 1);

            return menu;
        }

        var filterDiv = createFilterDiv();

        function showNewImageDialog() {
            BV.newImageDialog({
                currentColor: currentColor,
                secondaryColor: pcColorSlider.getSecondaryRGB(),
                maxCanvasSize: klekiMaxCanvasSize,
                canvasWidth: pcCanvas.width,
                canvasHeight: pcCanvas.height,
                workspaceWidth: window.innerWidth < collapseThreshold ? width : width - toolwidth,
                workspaceHeight: height,
                onConfirm: function(width, height, color) {
                    pcCanvas.reset({
                        width: width,
                        height: height,
                        color: color.a === 1 ? color : null
                    });

                    layerManager.update(0);
                    setCurrentLayer(pcCanvas.getLayer(0));
                    pcCanvasWorkspace.resetView();
                    handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());

                    isFirstImage = false;
                },
                onCancel: function() {}
            });
        }

        function shareImage(callback) {
            BV.shareCanvas({
                canvas: pcCanvas.getCompleteCanvas(1),
                fileName: BV.getDate() + 'Kleki.png',
                title: BV.getDate() + 'Kleki.png',
                callback: callback ? callback : function() {}
            });
        }

        function createFileDiv() {
            "use strict";

            var div = document.createElement("div");

            function asyncCreation() {
                var fileView = false;
                var filemenu = document.createElement("div");
                var newbutton = document.createElement("button");
                var savebutton = document.createElement("button");
                var shareButton = document.createElement("button");
                var storebutton = document.createElement("button");
                var clearbutton = document.createElement("button");
                var uploadImgurButton = document.createElement("button");
                var uploadInkButton = document.createElement("button");
                var checkPNG = document.createElement("input");


                newbutton.tabIndex = -1;
                savebutton.tabIndex = -1;
                shareButton.tabIndex = -1;
                storebutton.tabIndex = -1;
                clearbutton.tabIndex = -1;
                uploadImgurButton.tabIndex = -1;
                uploadInkButton.tabIndex = -1;
                checkPNG.tabIndex = -1;

                newbutton.innerHTML = "<img src='0-4-14-17641b3b230/img/ui/new-image.png' alt='New Image'/>New";
                savebutton.innerHTML = "<img src='0-4-14-17641b3b230/img/ui/export.png' alt='Save Image' height='20'/>Save";
                shareButton.innerHTML = "<img src='0-4-14-17641b3b230/img/ui/share.png' alt='Share Image' height='20'/>Share";
                storebutton.textContent = "Store";
                clearbutton.textContent = "Clear";
                uploadImgurButton.innerHTML = "<img style='float:left' src='0-4-14-17641b3b230/img/ui/upload.png' alt='Upload to Imgure'/>Public";
                uploadInkButton.innerHTML = "<img style='float:left' src='0-4-14-17641b3b230/img/ui/upload.png' alt='Upload to Drive/...'/>Drive / ...";
                newbutton.className = "gridButton";
                savebutton.className = "gridButton";
                shareButton.className = "gridButton";
                storebutton.className = "gridButton";
                clearbutton.className = "gridButton";
                uploadImgurButton.className = "gridButton";
                uploadInkButton.className = "gridButton";

                //uploadImgurButton.style.width = "250px";
                //uploadInkButton.style.width = "250px";

                checkPNG.type = "checkbox";
                checkPNG.style.cssFloat = "left";
                checkPNG.checked = exportPNG;


                var importbutton = document.createElement("input");
                importbutton.tabIndex = -1;
                importbutton.type = "file";
                importbutton.multiple = true;
                importbutton.accept = "image";
                importbutton.size = "71";
                importbutton.textContent = "Import";
                var importWrapper = importbutton;
                div.getImportButton = function() {
                    return importbutton;
                }

                function createImportButton() {
                    importWrapper = document.createElement("div");
                    importWrapper.className = "gridButton";
                    importWrapper.style.position = "relative";
                    importWrapper.style.cursor = "pointer";
                    importWrapper.style.cssFloat = "left";

                    var innerMask = document.createElement("div");
                    innerMask.style.width = "120px";
                    innerMask.style.height = "28px";
                    innerMask.style.overflow = "hidden";
                    innerMask.style.cursor = "pointer";
                    innerMask.style.position = "relative";

                    importWrapper.appendChild(innerMask);
                    innerMask.appendChild(importbutton);

                    var importFakeButton = document.createElement("button");
                    importFakeButton.innerHTML = "<img style='float:left' src='0-4-14-17641b3b230/img/ui/import.png' alt='Import Image'/>Import";
                    importFakeButton.tabIndex = -1;

                    BV.css(importFakeButton, {
                        width: "120px",
                        display: "box",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        cursor: "pointer"
                    });
                    BV.css(importbutton, {
                        display: 'none'
                    });
                    importWrapper.appendChild(importFakeButton);

                    importFakeButton.onclick = function() {
                        importbutton.click();
                    }
                }

                createImportButton();

                importbutton.onchange = function (e) {
                    handleFileSelect(importbutton.files, 'default');
                    importbutton.value = "";
                };

                checkPNG.onchange = function () {
                    exportPNG = checkPNG.checked;
                };


                // --- export filetype dropdown ---
                let exportTypeWrapper;
                let exportTypeInput;
                {
                    exportTypeWrapper = BV.div({
                        css: {
                            fontSize: '15px',
                            marginLeft: '10px',
                            marginTop: '10px',
                            cssFloat: 'left',
                            width: 'calc(50% - 15px)'
                        }
                    });
                    exportTypeInput = BV.div({
                        tagName: 'select',
                        css: {
                            cursor: 'pointer',
                            marginBottom: '10px',
                            fontSize: '15px',
                            padding: '3px',
                            width: '100%'
                        }
                    });
                    exportTypeInput.tabIndex = -1;
                    let optionArr = [
                        ['png', 'Save PNG'],
                        ['psd', 'Save PSD'],
                        ['layers', 'Save Layers'],
                    ];
                    for(let i = 0; i < optionArr.length; i++) {
                        if (optionArr[i] === null) {
                            continue;
                        }
                        let option = document.createElement('option');
                        option.value = optionArr[i][0];
                        option.textContent = optionArr[i][1];
                        exportTypeInput.appendChild(option);
                    }
                    exportTypeInput.addEventListener('change', function() {
                        exportType = exportTypeInput.value;
                        exportTypeInput.blur();
                    });
                    exportTypeWrapper.appendChild(exportTypeInput);

                }



                newbutton.onclick = showNewImageDialog;
                savebutton.onclick = function () {
                    saveImageToComputer();
                };
                shareButton.onclick = function() {
                    shareButton.disabled = true;
                    shareImage(function() {
                        shareButton.disabled = false;
                    });
                };
                storebutton.onclick = function () {
                    storebutton.disabled = true;
                    storebutton.textContent = '...storing...';
                    function store(klekiProjectObj) {

                        BV.browserStorage.storeKlekiProjectObj(klekiProjectObj, function() {
                            storebutton.disabled = false;
                            storebutton.textContent = 'Store';
                            resetSaveReminder();
                            BV.browserStorage.isEmpty(function(b) {
                                clearbutton.disabled = b;
                                storebutton.textContent = b ? 'Store' : 'Overwrite';
                            });
                            BV.popup({
                                target: pcWeb,
                                type: "ok",
                                message: [
                                    "<b>Current state</b> of your image is stored in this browser. It will be loaded again upon reopening Kleki with this browser on this device.",
                                    '',
                                    '<b>Important:</b>',
                                    '- Browser may delete it, depending on',
                                    '&nbsp;&nbsp;disk space and settings',
                                    '- Stores 1 image at a time',
                                    '- Use <i>Save</i> for permanent storage'
                                ].join('<br>'),
                                buttons: ["Ok"],
                                callback: function (result) {
                                }
                            });
                        }, function(errorStr) {
                            storebutton.disabled = false;
                            storebutton.textContent = 'Store';
                            setTimeout(function() {
                                throw 'storeKlekiProjectObj error, ' + errorStr;
                            })
                            BV.popup({
                                target: pcWeb,
                                type: "error",
                                message: "Failed to store. Your browser might not support this feature.",
                                buttons: ["Ok"],
                                callback: function (result) {
                                }
                            });
                            BV.browserStorage.isEmpty(function(b) {
                                clearbutton.disabled = b;
                                storebutton.textContent = b ? 'Store' : 'Overwrite';
                            });
                        });
                    }
                    pcCanvas.getKlekiProjectObj(store, function(errorStr) {
                        storebutton.disabled = false;
                        storebutton.textContent = 'Store';
                        BV.popup({
                            target: pcWeb,
                            type: "error",
                            message: "Failed to store. Your browser might not support this feature.",
                            buttons: ["Ok"],
                            callback: function (result) {
                            }
                        });
                        setTimeout(function() {
                            throw 'PcCanvas.getKlekiProjectObj error, ' + errorStr;
                        }, 0);
                    });
                };
                clearbutton.onclick = function () {
                    BV.browserStorage.clear(function() {
                        BV.popup({
                            target: pcWeb,
                            type: "ok",
                            message: "Cleared Browser Storage.",
                            buttons: ["Ok"],
                            callback: function (result) {
                                BV.browserStorage.isEmpty(function(b) {
                                    clearbutton.disabled = b;
                                    storebutton.textContent = b ? 'Store' : 'Overwrite';
                                });
                            }
                        });
                    }, function(error) {
                        BV.popup({
                            target: pcWeb,
                            type: "error",
                            message: "Failed to clear.",
                            buttons: ["Ok"],
                            callback: function (result) {
                                BV.browserStorage.isEmpty(function(b) {
                                    clearbutton.disabled = b;
                                    storebutton.textContent = b ? 'Store' : 'Overwrite';
                                });
                            }
                        });
                    });
                };
                uploadImgurButton.onclick = function () {
                    if (!isUploadAllowed()) {
                        alert("Nothing to upload.");
                        return;
                    }

                    var inputTitle = document.createElement("input");
                    inputTitle.type = "text";
                    inputTitle.value = "Untitled";
                    var inputDescription = document.createElement("textarea");
                    inputDescription.cols = 30;
                    inputDescription.rows = 2;
                    var labelTitle = document.createElement("div");
                    labelTitle.textContent = "Title:";
                    var labelDescription = document.createElement("div");
                    labelDescription.innerHTML = "<br>Caption:";

                    var tos = document.createElement("div");
                    tos.innerHTML = "<br/><a href=\"https://imgur.com/tos\" target=\"_blank\" rel=\"noopener noreferrer\">Terms of Service</a> for imgur.com";

                    function doUpload() {
                        var img = pcCanvas.getCompleteCanvas(1).toDataURL("image/jpeg").split(',')[1];

                        var w = window.open();
                        var label = w.document.createElement("div");
                        var gif = w.document.createElement("img");
                        gif.src = "https://bitbof.com/doodler/loading.gif";
                        label.appendChild(gif);
                        BV.css(gif, {
                            filter: "invert(1)"
                        });
                        w.document.body.style.backgroundColor = "#121211";
                        w.document.body.style.backgroundImage = "linear-gradient(#2b2b2b 0%, #121211 50%)";
                        w.document.body.style.backgroundRepeat = "no-repeat";
                        var labelText = w.document.createElement("div");
                        labelText.style.marginTop = "10px";
                        label.appendChild(labelText);
                        labelText.textContent = "Uploading...";

                        w.document.body.appendChild(label);
                        BV.css(label, {
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "100px",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "20px",
                            textAlign: "center",
                            transition: "opacity 0.3s ease-in-out",
                            opacity: 0,
                            color: "#ccc"
                        });
                        setTimeout(function () {
                            label.style.opacity = 1;
                        }, 20);

                        function failScenario() {
                            w.close();
                            alert('Upload Failed. Sorry.');
                        }


                        var fd = new FormData();
                        fd.append("image", img);
                        fd.append("title", inputTitle.value);
                        fd.append("description", inputDescription.value);
                        var xhr = new XMLHttpRequest();


                        var timedOut = false;
                        var isSending = true;
                        xhr.onreadystatechange = function () {
                            if (timedOut) {
                                return;
                            }
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                isSending = false;

                                var response = JSON.parse(xhr.responseText);
                                w.location.href = response.data.link.replace(".jpg", "") + "?tags";
                                var responseData = JSON.parse(xhr.responseText);

                                BV.popup({
                                    target: pcWeb,
                                    type: "ok",
                                    message: "<h3>Upload Successful</h3><br>To delete your image from imgur go here:<br><a target='_blank' rel=\"noopener noreferrer\" href='https://imgur.com/delete/" + responseData.data.deletehash + "'>imgur.com/<b>delete</b>/" + responseData.data.deletehash + "</a><br><br>",
                                    buttons: ["Ok"],
                                    callback: function (result) {
                                    }
                                });

                                resetSaveReminder();

                            } else if (xhr.readyState === 4) {
                                isSending = false;
                                failScenario();
                            }
                        };
                        xhr.upload.onprogress = function (oEvent) {
                            if (oEvent.lengthComputable) {
                                var percentComplete = oEvent.loaded / oEvent.total;
                                labelText.textContent = " Uploading..." + parseInt(percentComplete * 99, 10) + "%";
                            } else {
                            }
                        };
                        xhr.open("POST", "https://api.imgur.com/3/image.json", true);
                        xhr.setRequestHeader('Authorization', 'Client-ID 1f46dfe8d78dad2');
                        xhr.send(fd);
                        setTimeout(function () {
                            if (!isSending) {
                                return;
                            }
                            timedOut = true;
                            failScenario();
                        }, 1000 * 60); //adding event listeners for xhr errors would be better
                    }

                    var outDiv = document.createElement("div");
                    var infoHint = document.createElement("div");
                    infoHint.className = "info-hint";
                    infoHint.textContent = "Anyone with the link to your uploaded image will be able to view it.";
                    outDiv.appendChild(infoHint);
                    outDiv.appendChild(labelTitle);
                    outDiv.appendChild(inputTitle);
                    outDiv.appendChild(labelDescription);
                    outDiv.appendChild(inputDescription);
                    outDiv.appendChild(tos);
                    BV.popup({
                        target: pcWeb,
                        message: "<b>Image Upload to Imgur (public)</b>",
                        type: "upload",
                        div: outDiv,
                        buttons: ["Upload", "Cancel"],
                        callback: function (val) {
                            if (val === "Upload" || val === "Yes" || val === "Ok") {
                                doUpload();
                            }
                        }
                    });
                };


                uploadInkButton.onclick = function () {
                    if (!isUploadAllowed()) {
                        alert("Nothing to upload.");
                        return;
                    }

                    resetSaveReminder();

                    var imgDataUrl = pcCanvas.getCompleteCanvas(1).toDataURL("image/png").split(',', 2)[1];

                    var first = true;
                    var progress = new BV.ProgressPopup({
                        callback: function () {
                            pcWeb.removeChild(progress.getDiv());
                        }
                    });


                    function write(file, base64Data) {
                        if (first) {
                            first = false;
                            pcWeb.appendChild(progress.getDiv());
                        }

                        filepicker.write(file, base64Data, {
                            base64decode: !0
                        }, function (file) {
                            progress.update(100, true);
                        }, function (file) {
                            progress.update(-1);
                        }, function (file) {
                            progress.update(file);
                        })
                    }

                    var e = this;
                    var fpf = {
                        url: "https://kleki.com/0-4-14-17641b3b230/img/blank_for_filepicker.png",
                        filename: BV.getDate() + "Kleki",
                        mimetype: "image/png",
                        isWriteable: true
                    };

                    function onFilepickerLoaded() {
                        filepicker.exportFile(fpf, {
                            services: ["GOOGLE_DRIVE", "DROPBOX", "FLICKR", "PICASA", "BOX", "EVERNOTE"]
                        }, function (file) {

                            //autoclose filepicker dialog
                            var fpShade = document.getElementById("filepicker_shade");
                            if (fpShade) {
                                fpShade.onclick();
                            }

                            setTimeout(function () {
                                write(file, imgDataUrl);
                            }, 0);
                        });
                    }

                    var intervalId;
                    intervalId = setInterval(function () {
                        if (window.filepicker && window.filepicker.exportFile) {
                            clearInterval(intervalId);
                            onFilepickerLoaded();
                        }
                    }, 100);

                    //load filepicker.io module
                    (function (a) {
                        if (window.filepicker) {
                            return
                        }
                        var b = a.createElement("script");
                        b.type = "text/javascript";
                        b.async = !0;
                        b.src = ("https:" === a.location.protocol ? "https:" : "http:") + "//api.filepicker.io/v1/filepicker.js";
                        var c = a.getElementsByTagName("script")[0];
                        c.parentNode.insertBefore(b, c);
                        var d = {};
                        d._queue = [];
                        var e = "pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane".split(",");
                        var f = function (a, b) {
                            return function () {
                                b.push([a, arguments])
                            }
                        };
                        for (var g = 0; g < e.length; g++) {
                            d[e[g]] = f(e[g], d._queue)
                        }
                        window.filepicker = d
                    })(document);
                    filepicker.setKey("A51vbok3OTKeTrXIoTLkxz");

                };

                var saveNote = document.createElement("div");
                saveNote.textContent = "No autosave available";
                BV.css(saveNote, {
                    textAlign: "center",
                    marginTop: "10px",
                    background: "rgb(243, 243, 161)",
                    marginLeft: "10px",
                    marginRight: "10px",
                    borderRadius: "4px",
                    padding: "5px",
                    color: 'rgba(0,0,0,0.65)'
                });

                function createSpacer() {
                    var el = document.createElement("div");
                    var clearer = document.createElement("div");
                    var line = document.createElement("div");
                    el.appendChild(clearer);
                    el.appendChild(line);
                    BV.css(clearer, {
                        clear: 'both'
                    });
                    BV.css(line, {
                        marginLeft: "10px",
                        marginRight: "10px",
                        marginTop: "10px",
                        borderBottom: "1px solid rgba(0,0,0,0.2)",
                        clear: 'both'
                    });
                    return el;
                }

                var headlineLocalStorage = document.createElement("div");
                headlineLocalStorage.innerHTML = "Browser Storage<br>";
                BV.css(headlineLocalStorage, {
                    marginLeft: "10px",
                    marginRight: "10px",
                    paddingTop: "5px",
                    marginBottom: "-5px"
                });
                var headlineUpload = document.createElement("div");
                headlineUpload.innerHTML = "Upload<br>";
                BV.css(headlineUpload, {
                    marginLeft: "10px",
                    marginRight: "10px",
                    paddingTop: "5px",
                    marginBottom: "-5px"
                });


                //actual structure
                filemenu.appendChild(saveNote);
                filemenu.appendChild(newbutton);
                filemenu.appendChild(savebutton);
                filemenu.appendChild(importWrapper);
                filemenu.appendChild(exportTypeWrapper);
                if(BV.canShareFiles()) {
                    filemenu.appendChild(shareButton);
                }
                filemenu.appendChild(createSpacer());
                filemenu.appendChild(headlineLocalStorage);
                filemenu.appendChild(storebutton);
                filemenu.appendChild(clearbutton);
                filemenu.appendChild(createSpacer());
                filemenu.appendChild(headlineUpload);
                filemenu.appendChild(uploadImgurButton);
                filemenu.appendChild(uploadInkButton);

                div.appendChild(filemenu);


                // --- interface ---
                div.setIsVisible = function(b) {
                    if(b) {

                        BV.browserStorage.isEmpty(function(b) {
                            clearbutton.disabled = b;
                            storebutton.textContent = b ? 'Store' : 'Overwrite';
                        });

                    }
                };
            }
            div.setIsVisible = function() {};//placeholder
            setTimeout(asyncCreation, 1);
            return div;
        }

        var fileDiv = createFileDiv();
        var mainTabRow = new BV.TabRow({
            initialId: 'draw',
            tabArr: [
                {
                    id: 'draw',
                    label: 'Brush',
                    onOpen: function() {
                        if (currentBrushId === 'eraser') {
                            pcColorSlider.enable(false);
                        }
                        colorDiv.appendChild(pcColorSlider.getElement());
                        colorDiv.appendChild(pcColorSlider.getOutputElement());
                        colorDiv.appendChild(toolspaceStabilizerRow.getElement());
                        brushDiv.style.display = 'block';
                    },
                    onClose: function() {
                        brushDiv.style.display = 'none';
                    }
                },
                {
                    id: 'hand',
                    label: 'Hand',
                    isVisible: false,
                    onOpen: function() {
                        handUi.setIsVisible(true);
                    },
                    onClose: function() {
                        handUi.setIsVisible(false);
                    }
                },
                {
                    id: 'fill',
                    label: 'Fill',
                    isVisible: false,
                    onOpen: function() {
                        pcColorSlider.enable(true);
                        fillUi.setIsVisible(true);
                    },
                    onClose: function() {
                        fillUi.setIsVisible(false);
                    }
                },
                {
                    id: 'text',
                    label: 'Text',
                    isVisible: false,
                    onOpen: function() {
                        pcColorSlider.enable(true);
                        textUi.setIsVisible(true);
                    },
                    onClose: function() {
                        textUi.setIsVisible(false);
                    }
                },
                {
                    id: 'layers',
                    label: 'Layers',
                    onOpen: function() {
                        layerManager.update();
                        layerManager.style.display = 'block';
                    },
                    onClose: function() {
                        layerManager.style.display = 'none';
                    }
                },
                {
                    id: 'edit',
                    label: 'Edit',
                    onOpen: function() {
                        filterDiv.style.display = 'block';
                    },
                    onClose: function() {
                        filterDiv.style.display = 'none';
                    }
                },
                {
                    id: 'file',
                    label: 'File',
                    onOpen: function() {
                        fileDiv.style.display = 'block';
                        fileDiv.setIsVisible(true);
                    },
                    onClose: function() {
                        fileDiv.style.display = 'none';
                        fileDiv.setIsVisible(false);
                    }
                }
            ]
        });
        function updateMainTabVisibility() {
            if(!mainTabRow) {
                return;
            }

            let toolObj = {
                'draw': {},
                'hand': {},
                'fill': {},
                'text': {}
            };

            let activeStr = toolspaceToolRow.getActive();
            let oldTabId = mainTabRow.getOpenedTabId();

            let keysArr = Object.keys(toolObj);
            for (let i = 0; i < keysArr.length; i++) {
                if (activeStr === keysArr[i]) {
                    mainTabRow.setIsVisible(keysArr[i], true);
                } else {
                    mainTabRow.setIsVisible(keysArr[i], false);
                    if (oldTabId === keysArr[i]) {
                        mainTabRow.open(activeStr);
                    }
                }
            }

        }

        function copyToClipboard() {
            BV.clipboardDialog(pcWeb, pcCanvas.getCompleteCanvas(1), function (inputObj) {
                if (inputObj.left === 0 && inputObj.right === 0 && inputObj.top === 0 && inputObj.bottom === 0) {
                    return;
                }
                //do a crop
                var p = {
                    context: currentLayerCtx,
                    canvas: pcCanvas,
                    input: inputObj,//{left,right,top,bottom}
                    logger: BV.pcLog
                };
                BV.FilterLib.cropExtend.apply(p);
                layerManager.update();
                pcCanvasWorkspace.resetView();
                handUi.update(pcCanvasWorkspace.getScale(), pcCanvasWorkspace.getAngleDeg());
            });
        }

        function saveImageToComputer() {

            resetSaveReminder();


            function saveImage(canvas, filename, mimeType) {
                var parts = canvas.toDataURL(mimeType).match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/);
                //assume base64 encoding
                var binStr = atob(parts[3]);
                //convert to binary in ArrayBuffer
                var buf = new ArrayBuffer(binStr.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < view.length; i++) {
                    view[i] = binStr.charCodeAt(i);
                }
                var blob = new Blob([view], {'type': parts[1]});
                saveAs(blob, filename);
            }

            if (exportType === 'png') {
                let extension = 'png';
                let mimeType = 'image/png';
                let filename = BV.getDate() + "Kleki." + extension;
                let fullCanvas = pcCanvas.getCompleteCanvas(1);

                /*fullCanvas.toBlob(function(blob) {
                    if(blob === null) {
                        throw 'save image error, blob is null';
                    }
                    saveAs(blob, filename);
                }, mimetype);*/

                //using old code, because saving somehow doesn't work for ipad before ios 13
                //and it doesn't even throw an exception
                try {
                    saveImage(fullCanvas, filename, mimeType);
                } catch (error) { //fallback for old browsers
                    var im = new Image();
                    im.width = pcCanvas.getWidth();
                    im.height = pcCanvas.getHeight();
                    im.src = fullCanvas.toDataURL(mimeType);
                    BV.exportDialog(pcWeb, im);
                }
            } else if (exportType === 'layers') {
                let extension = 'png';
                let mimeType = 'image/png';
                let fileBase = BV.getDate() + "Kleki";
                let layerArr = pcCanvas.getLayersFast();
                for (let i = 0; i < layerArr.length; i++) {
                    let item = layerArr[i];
                    let fnameArr = [
                        fileBase,
                        '_',
                        ('' + (i + 1)).padStart(2, '0'),
                        '_',
                        item.name,
                        '.',
                        extension
                    ];
                    saveImage(item.canvas, fnameArr.join(''), mimeType);
                }
            } else if (exportType === 'psd') {

                let layerArr = pcCanvas.getLayersFast();

                let psdConfig = {
                    width: pcCanvas.getWidth(),
                    height: pcCanvas.getHeight(),
                    children: [],
                    canvas: pcCanvas.getCompleteCanvas(1)
                };
                for (let i = 0; i < layerArr.length; i++) {
                    let item = layerArr[i];
                    psdConfig.children.push({
                        name: item.name,
                        opacity: item.opacity,
                        canvas: item.canvas,
                        blendMode: BV.PSD.blendKlekiToPsd(item.mixModeStr),
                        left: 0,
                        top: 0
                    });
                }
                let buffer = agPsd.writePsdBuffer(psdConfig);
                let blob = new Blob([buffer], { type: 'application/octet-stream' });
                saveAs(blob, BV.getDate() + 'Kleki.psd');

            }

        }


        var bottomBar = new BV.BottomBar({
            feedbackDialog: function () {
                showFeedbackDialog(pcWeb);
            },
            showHelp: function () {
                showIframePopup('./help/', pcWeb);
            },
            showChangelog: function () {
                showIframePopup('./changelog/', pcWeb);
            },
            onSwap: function() {
                uiState = uiState === 'left' ? 'right' : 'left';
                updateUi();
            }
        });

        toolspace.appendChild(layerPreview.getElement());
        toolspace.appendChild(mainTabRow.getElement());

        toolspace.appendChild(brushDiv);
        toolspace.appendChild(handUi.getElement());
        toolspace.appendChild(fillUi.getElement());
        toolspace.appendChild(textUi.getElement());
        toolspace.appendChild(layerManager);
        toolspace.appendChild(filterDiv);
        toolspace.appendChild(fileDiv);
        toolspace.appendChild(bottomBar.getDiv());


        // --- interface ---

        var logoLarge = true;
        div.resize = function (p_w, p_h) {
            let logoButtonHeight = 36;


            width = Math.max(0, p_w);
            height = Math.max(0, p_h);

            updateCollapse();

            var threshold = 617; //590
            bottomBar.setIsVisible(height >= threshold);
            layerPreview.setIsVisible(height >= 579);
            pcColorSlider.setHeight(Math.max(163, Math.min(400, height - 505)));
            toolspaceToolRow.setIsSmall(height < 540);

        };


        div.showMessage = function(msg) {
            output.out(msg);
        };


        div.resize(width, height);

        return div;
    }


    function showIframePopup(url, target) {
        if (window.innerHeight < 500 || window.innerWidth < 700) {
            window.open(url);
            return;
        }

        let iframe = BV.div({
            tagName: 'iframe',
            custom: {
                src: url,
            },
            css: {
                width: '100%',
                height: '100%'
            }
        });
        let titleEl = BV.div({});
        let linkEl = BV.div({
            tagName: 'a',
            parent: titleEl,
            content: 'Open in new tab',
            custom: {
                href: 'help',
                target: '_blank',
            },
            onClick: function() {
                popup.close();
            }
        });
        iframe.onload = function() {
            BV.setAttributes(linkEl, {
                href: iframe.contentWindow.location
            });
        };


        let popup = new BV.Popup({
            title: titleEl,
            content: iframe,
            width: 880,
            isMaxHeight: true
        });

    }


    var showFeedbackDialog = function (target) {
        "use strict";
        var div = document.createElement("div");
        div.style.width = (7 * boxSize) + "px";
        var descr = document.createElement("div");
        descr.innerHTML = "Problem reports, feature ideas, and general comments are welcome.<br><b>Note:</b> <a href='./help/' target='_blank'>Help</a> might already address your problem.";
        //INPUT FORM
        var boxSize = 50;
        var inputDescription = document.createElement("textarea");
        inputDescription.className = "kleki-textarea";
        inputDescription.placeholder = "Your feedback...";
        BV.css(inputDescription, {
            resize: "none",
            width: "100%",
            height: "100%",
            marginBottom: boxSize / 4.0 + "px"
        });
        BV.css(div, {
            fontSize: (boxSize / 3.0) + "px"
        });

        var inputWrapper = document.createElement("div");
        BV.css(inputWrapper, {
            width: "100%",
            height: (boxSize * 4) + "px",
            paddingBottom: boxSize / 4.0 + "px",
            marginTop: '10px',
            boxSizing: "border-box"
        });
        inputWrapper.appendChild(inputDescription);

        var emailInput = document.createElement("input");
        var emailCaption = document.createElement("div");
        emailInput.className = "kleki-input";
        emailCaption.innerHTML = "(Optional) If you need a reply:<br/>";
        emailInput.placeholder = "Your e-mail (optional) ...";
        BV.css(emailInput, {
            resize: "none",
            width: "100%"
        });


        let messageInfoEl = document.createElement('a');
        messageInfoEl.style.display = 'inline-block';
        messageInfoEl.style.marginTop = '10px';
        messageInfoEl.textContent = 'What does get sent?';
        messageInfoEl.onclick = function() {
            let contentArr = [
                'The following text gets sent upon pressing Submit:',
                'message: ' + inputDescription.value,
                '',
                'e-mail: ' + emailInput.value,
                '',
                'kleki version: ' + KLEKI.version,
                '',
                'user agent: ' + navigator.userAgent,
                '',
                'version hash: ' + KLEKI.versionHash,
            ];
            alert(contentArr.join("\n"));
        };

        div.appendChild(descr);
        div.appendChild(inputWrapper);
        div.appendChild(emailCaption);
        div.appendChild(emailInput);
        div.appendChild(messageInfoEl);

        inputDescription.onclick = function () {
            inputDescription.focus();
        };

        function sendFeedback(msgStr, mailStr, versionStr, debugStr) {
            var xmlhttp, response;
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                var response;
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    alert("Success. Thank you very much for your feedback.");
                }
            };

            function replaceAt(str, index, character) {
                return str.substr(0, index) + character + str.substr(index + character.length);
            }

            let formData = new FormData();
            formData.append('msg', msgStr);
            formData.append('version', versionStr);
            formData.append('email', mailStr);
            formData.append('debug', debugStr);

            var fb = "mendFeedb";
            xmlhttp.open("POST", replaceAt(fb, 0, "s") + "ack.php", true); //obscure address a little, because of bots
            xmlhttp.send(formData);
        }

        setTimeout(function () {
            inputDescription.focus();
        }, 10);
        BV.popup({
            target: target,
            title: "Send Feedback",
            message: "<b>Send Feedback</b>",
            div: div,
            buttons: ["Submit", "Cancel"],
            callback: function (val) {

                if (val === "Submit") {
                    if (inputDescription.value != "") {
                        sendFeedback(inputDescription.value, emailInput.value, KLEKI.version, KLEKI.versionHash);
                    }
                } else if (val === "Cancel") {
                }
            }
        });
    };

    var pcWeb;
    var additionalResizeCallback = function () {
    };

    (function() {

        //DOMContentLoaded -> onDomLoaded -> onKlekiProjectObjLoaded

        function onKlekiProjectObjLoaded(klekiProjectObj) {
            if(KLEKI.isInitialized) {
                throw 'onKlekiProjectObjLoaded called more than once';
            }
            let loadingScreenEl = document.getElementById("loading-screen");
            loadingScreenEl.parentNode.removeChild(loadingScreenEl);
            loadingScreenEl = null;


            pcWeb = new PCWeb(window.innerWidth, window.innerHeight, klekiProjectObj);

            BV.addEventListener(window, 'resize', function () {
                pcWeb.resize(window.innerWidth, window.innerHeight);
                additionalResizeCallback();
            });
            BV.addEventListener(window, 'orientationchange', function () {
                pcWeb.resize(window.innerWidth, window.innerHeight);
                additionalResizeCallback();
            });
            // prevent ctrl scroll -> zooming page
            BV.addEventListener(pcWeb, 'wheel', function(event) {
                event.preventDefault();
            });
            //maybe prevent zooming on safari mac os - I can't test it
            function prevent(e) {
                e.preventDefault();
            };
            window.addEventListener('gesturestart', prevent);
            window.addEventListener('gesturechange', prevent);
            window.addEventListener('gestureend', prevent);
            document.body.appendChild(pcWeb);

            klekiProjectObj = null;
            KLEKI.isInitialized = true;
            KLEKI.onInit();
        }

        function onDomLoaded() {
            if (pcWeb) {//already initialized
                return;
            }
            BV.browserStorage.getKlekiProjectObj(function(klekiProjectObj) {
                onKlekiProjectObjLoaded(klekiProjectObj);
            }, function(errorStr) {
                onKlekiProjectObjLoaded(null);
                setTimeout(function() {
                    pcWeb.showMessage('Failed to restore from Browser Storage');
                    throw 'getKlekiProjectObj() error, ' + errorStr;
                }, 100);
            });
        }

        BV.addEventListener(window, 'DOMContentLoaded', function () {
            setTimeout(onDomLoaded, 10);
        });

    })();





    var oldActionNumber = BV.pcLog.getActionNumber();
    setInterval(function () {
        if (document.visibilityState !== 'visible') {
            return;
        }

        var reminderTimelimitMs = 1000 * 60 * 20;// 20 minutes

        let actionNumber = BV.pcLog.getActionNumber();
        //number of actions that were done since last reminder
        var loggerDist = actionNumber[0] !== oldActionNumber[0] ? actionNumber[1] : Math.abs(actionNumber[1] - oldActionNumber[1]);

        if(KLEKI.lastReminderResetAt + reminderTimelimitMs < (performance.now()) && loggerDist >= 50) {
            resetSaveReminder();
            BV.showSaveReminderToast();
        }
    }, 1000 * 60);

    function resetSaveReminder() {
        KLEKI.lastReminderResetAt = performance.now();
        oldActionNumber = BV.pcLog.getActionNumber();
        BV.setEventListener(window, 'onbeforeunload', null);
    }

    //confirmation dialog when closing tab
    function onBeforeUnload(e) {
        e.preventDefault();
        e.returnValue = '';
    }

    BV.pcLog.addListener(function() {
        let actionNumber = BV.pcLog.getActionNumber();
        if(0 !== actionNumber && oldActionNumber.join('.') !== actionNumber.join('.')) {
            BV.setEventListener(window, 'onbeforeunload', onBeforeUnload);
        } else {
            BV.setEventListener(window, 'onbeforeunload', null);
        }
    });



})();
