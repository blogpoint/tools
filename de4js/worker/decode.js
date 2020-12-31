/**
 * @name  de4js
 * @description  JavaScript Deobfuscator and Unpacker
 * @author  Zzbaivong <Zzbaivong@gmail.com> (https://lelinhtinh.github.io)
 * @version  1.11.1
 * @copyright  Zzbaivong 2017
 * @license  MIT
 */

/* globals EvalDecode, ArrayDecode, _NumberDecode, JSFuckDecode, ObfuscatorIO, CleanSource, AADecode, JJdecode, Urlencoded, P_A_C_K_E_R, JavascriptObfuscator, MyObfuscate */
/* eslint-disable no-console */

self.addEventListener('message', (e) => {
  self.importScripts('https://rawcdn.githack.com/teachwiki/tools/d4e0f2bf8233dca233917f19ba3664d106a37b2b/de4js/third_party/mathjs/math.min.js');
  self.importScripts('https://rawcdn.githack.com/teachwiki/tools/0be22eac909468185052fb35fb1701c69ce4a191/de4js/lib/utils.js');

  let source = e.data.source;
  const packer = e.data.packer;
  const options = e.data.options;

  const methods = {
    evalencode: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/ffd5020f4b8738e3a722a5901ef473c5d81e4eb5/de4js/lib/evaldecode.js');
      return EvalDecode(source);
    },
    _numberencode: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/e2f4b38050e0eb57a0df69c1b90c4b398ee3aefb/de4js/lib/numberdecode.js');
      return _NumberDecode(source);
    },
    arrayencode: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/d47b903d6790a1867fb236669a59317602f30cdb/de4js/lib/arraydecode.js');
      return ArrayDecode(source, options);
    },
    jsfuck: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/4a676ecf75c8ec72f47e894d1bd07a67e23d8f63/de4js/lib/jsfuckdecode.js');
      return JSFuckDecode(source);
    },
    obfuscatorio: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/e97ddff83ef87ab14beb684d1d9342355c47c4a3/de4js/lib/obfuscatorio.js');
      return ObfuscatorIO(source, options);
    },
    cleansource: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/5deadc090a7820844f5c4ba8b877e06d2fa2949c/de4js/lib/cleansource.js');
      return CleanSource(source, options);
    },
    aaencode: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/0968be36efb444fb5b4afa1f1851835d64207e64/de4js/third_party/cat-in-136/aadecode.js');
      return AADecode.decode(source);
    },
    jjencode: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/b931d0f3c6b625e0fddd3af9023378567cabf713/de4js/third_party/decoder-jjencode/jjdecode.js');
      return JJdecode.decode(source);
    },
    urlencode: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/c7dafabf6893e1267bbec162672ef7f8d39c911d/de4js/third_party/js-beautify/unpackers/urlencode_unpacker.js');
      if (Urlencoded.detect(source)) return Urlencoded.unpack(source);
      throw 'Not matched';
    },
    p_a_c_k_e_r: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/a5234802b5353901b4de3539da20b5b2b6c342bb/de4js/third_party/js-beautify/unpackers/p_a_c_k_e_r_unpacker.js');
      if (P_A_C_K_E_R.detect(source)) return P_A_C_K_E_R.unpack(source);
      throw 'Not matched';
    },
    javascriptobfuscator: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/428cf0b58716c8226340cedda7e10215dd4488a0/de4js/third_party/js-beautify/unpackers/javascriptobfuscator_unpacker.js');
      if (JavascriptObfuscator.detect(source)) return JavascriptObfuscator.unpack(source);
      throw 'Not matched';
    },
    myobfuscate: () => {
      self.importScripts('https://rawcdn.githack.com/teachwiki/tools/a6fa381cad2fadc3d1f169f1f550fb0869f7050b/de4js/third_party/js-beautify/unpackers/myobfuscate_unpacker.js');
      if (MyObfuscate.detect(source)) return MyObfuscate.unpack(source);
      throw 'Not matched';
    },
  };

  try {
    source = methods[packer]();
  } catch (err) {
    throw new Error(err);
  }

  self.postMessage(source);
});
