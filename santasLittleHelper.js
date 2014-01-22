
/*
# Santa's Little Helper

Copyright (C) 2013
James F Thompson (Thompsons of Cedartown)
santasLittleHelper@cedartownonline.com

Permission to use, copy, modify, and/or distribute this software
for any purpose with or without fee is hereby granted, provided
that the above copyright notice and this permission notice appear
in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/


(function() {
  var audioVolume, characterLib, checkType, isBoolean, isFunction, isNumber, isObject, isString, isUndefined, muteAudio, root, style, styleHtml;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  characterLib = "123456789AaBbCcDdEeFfGgHhIiJj123456789KkLlMmNnOoPpQqRrSsT123456789tUuVvWwXxYyZz123456789";

  style = document.createElement("style");

  style.type = "text/css";

  styleHtml = ".santasLittleHelperPageWait{cursor:wait !important}";

  style.innerHTML = styleHtml;

  document.getElementsByTagName("head")[0].appendChild(style);

  muteAudio = false;

  audioVolume = 1;

  root.santasLittleHelper = function() {
    return true;
  };

  /*
   Set Alias
  */


  root.SLH = root.santasLittleHelper;

  root.santasLittleHelper.version = function() {
    return "0.9.3a";
  };

  /*
  	General Helpers
  */


  root.santasLittleHelper.isObject = function(objObject) {
    return checkType(objObject, "object");
  };

  isObject = function(objObject) {
    return checkType(objObject, "object");
  };

  root.santasLittleHelper.isBoolean = function(objBoolean) {
    return checkType(objBoolean, "boolean");
  };

  isBoolean = function(objBoolean) {
    return checkType(objBoolean, "boolean");
  };

  root.santasLittleHelper.isFunction = function(objFunction) {
    return checkType(objFunction, "function");
  };

  isFunction = function(objFunction) {
    return checkType(objFunction, "function");
  };

  root.santasLittleHelper.isNumber = function(objNumber) {
    return checkType(objNumber, "number");
  };

  isNumber = function(objNumber) {
    return checkType(objNumber, "number");
  };

  root.santasLittleHelper.isString = function(objString) {
    return checkType(objString, "string");
  };

  isString = function(objString) {
    return checkType(objString, "string");
  };

  root.santasLittleHelper.isUndefined = function(objUndefined) {
    return checkType(objUndefined, "undefined");
  };

  isUndefined = function(objUndefined) {
    return checkType(objUndefined, "undefined");
  };

  checkType = function(checkObject, objectType) {
    console.log(typeof checkObject);
    try {
      return typeof checkObject === objectType;
    } catch (e) {
      return false;
    }
  };

  root.santasLittleHelper.makeId = function(prefix, addLength) {
    var i;
    if (!prefix) {
      prefix = "";
    }
    if (!addLength) {
      addLength = 5;
    }
    i = 0;
    while (i < addLength) {
      prefix += characterLib.charAt(Math.floor(Math.random() * characterLib.length));
      i++;
    }
    return prefix;
  };

  root.santasLittleHelper.generatePassword = function(lengthOfPassword, includeSpecialCharacters) {
    var charset, i, retVal;
    if (!lengthOfPassword) {
      lengthOfPassword = 8;
    }
    charset = characterLib;
    if (includeSpecialCharacters) {
      charset += "`!?$?%^&*()_-+={[}]:;@~#|\<,>.?/";
    }
    retVal = "";
    i = 0;
    while (i < lengthOfPassword) {
      retVal += charset.charAt(Math.floor(Math.random() * characterLib.length));
      ++i;
    }
    return retVal;
  };

  /*
  	Page Helpers
  */


  root.santasLittleHelper.page = function() {
    return true;
  };

  root.santasLittleHelper.page.callBack = null;

  root.santasLittleHelper.page.wait = function() {
    $("body *").addClass("santasLittleHelperPageWait");
    if (isFunction(root.santasLittleHelper.page.callBack)) {
      return root.santasLittleHelper.page.callBack("wait");
    }
  };

  root.santasLittleHelper.page.go = function() {
    $("body *").removeClass("santasLittleHelperPageWait");
    if (isFunction(root.santasLittleHelper.page.callBack)) {
      return root.santasLittleHelper.page.callBack("go");
    }
  };

  /*
   Audio Helpers
  */


  root.santasLittleHelper.audio = function() {
    return true;
  };

  root.santasLittleHelper.audio.callBack = null;

  root.santasLittleHelper.audio.mute = function(mute) {
    var muteAction;
    muteAction = "checked";
    if (isBoolean(mute)) {
      muteAudio = mute;
      muteAction = "set";
    }
    if (isFunction(root.santasLittleHelper.audio.callBack)) {
      root.santasLittleHelper.audio.callBack("mute", muteAction, muteAudio);
    }
    return muteAudio;
  };

  root.santasLittleHelper.audio.volume = function(volume) {
    var volumeAction;
    volumeAction = "checked";
    if (isNumber(volume)) {
      try {
        audioVolume = volume / 100;
      } catch (e) {
        audioVolume = 0;
      }
      if (audioVolume < 0) {
        audioVolume = 0;
      }
      if (audioVolume > 1) {
        audioVolume = 1;
      }
      volumeAction = "set";
    }
    if (isFunction(root.santasLittleHelper.audio.callBack)) {
      root.santasLittleHelper.audio.callBack("volume", volumeAction, audioVolume);
    }
    return audioVolume * 100;
  };

  root.santasLittleHelper.audio.volumeUp = function(increment) {
    if (increment) {
      try {
        audioVolume += increment / 100;
      } catch (e) {
        audioVolume = 0;
      }
    } else {
      audioVolume += .1;
    }
    if (audioVolume > 1) {
      audioVolume = 1;
    }
    if (isFunction(root.santasLittleHelper.audio.callBack)) {
      root.santasLittleHelper.audio.callBack("volume", "up", audioVolume);
    }
    return audioVolume;
  };

  root.santasLittleHelper.audio.volumeDown = function(increment) {
    if (increment) {
      try {
        audioVolume -= increment / 100;
      } catch (e) {
        audioVolume = 0;
      }
    } else {
      audioVolume -= .1;
    }
    if (audioVolume < 0) {
      audioVolume = 0;
    }
    if (isFunction(root.santasLittleHelper.audio.callBack)) {
      root.santasLittleHelper.audio.callBack("volume", "down", audioVolume);
    }
    return audioVolume;
  };

  root.santasLittleHelper.audio.template = function() {
    var audio;
    if (!muteAudio) {
      if (isFunction(root.santasLittleHelper.audio.callBack)) {
        root.santasLittleHelper.audio.callBack("play", "template", audioVolume);
      }
      audio = document.createElement("audio");
      audio.src = "data:audio/wav;base64,";
      audio.volume = audioVolume;
      audio.play();
      audio.remove();
      return true;
    } else {
      return false;
    }
  };

  root.santasLittleHelper.audio.click = function() {
    var audio;
    if (!muteAudio) {
      if (isFunction(root.santasLittleHelper.audio.callBack)) {
        root.santasLittleHelper.audio.callBack("play", "click", audioVolume);
      }
      audio = document.createElement("audio");
      audio.src = "data:audio/wav;base64,UklGRnQGAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YU8GAACBgIF/gn2Cf4B+gn5+fYJ/gIF/gH+BfX6AfXt5fXx7e3x9fH1+f4CAfnx9f3t9gIB9en2Dfn58fYKDgIJ9hnh7hIZ8gYR6fHyCe4GCioF+gH93foWCgoJ5gHx5gniAeYJ0dneCgXN1jn1+fI1zfHp8dYiCe3qIhHpmfXqMeZJ0ACb/AAD//wAAQ/8A3pYANv/qYek5OGp3tICeexjYUkWgYMzzAB//hDyVcX2Yi5ppXLNsXYKEZ3l7aHGTn1pnlZlwVpuUgqOKgIOMYIpsoXVydJKdc296kZl3h3OAcoV6ao6Be298ipCFhIFxk3yIeXNuh4eHiYh/c3h1eJCUenCCfH9yeZSKcHR7eH9ugYl+eImFfWxuhX1uiIx+gYZmg355hHlzgXl1dIeWdGmciXpteYWMc3GOfntye5Khh1+beoaFgmJ5k4KUe3CXim2GdJaFYXmec1GomG97b4mZcnCIbX6EbX6LbWd1e4B0d4x6cXuKcoKMdoB5eZt9doh0e32Ag5CSgnOEkIWBgX6AeYqRenJ9hoKDhIR6gIBte42DeHuFhm18g35we4x9dnmBgHp+bniBfIF2eYB3fYV3dX+FdIOCf3Z7foF8e4mAfHuCdn+Lc3WKhXyEhnt7goF4foSDhH17f4uFfnp/io90c4OBfHuCg4JyhIxycH2JgnuDiHl8hH98dIODdIKBeIZ8fHeCiXx+f3SIf3V7eYSCdHuCgnh6hIFzioV3gYuAeXl9e4V7e3+JgnV6gIJ7hIiCe3yIinx9hYGAhX17h4OBfICFfIiFfHh9hn93gnp2hYR6foF4dn9/dX1/eX9/dHN+goB3eoF8fHt6f316fIF6gIF8eH2Cgnt/goV6iHx3iIR6f4CDg3uGg3yAiIN9g4B/gn+CgX59hn96fn+FfX59f4SCgIR7foJ7fYGAfoF6f4F5fHyDfXmFfnt5hIB5fn1/fX1+gHl9foN8fYGCfoCGen6AgoB/gH9/g3p8fYWGfXqDhH17gIOCfn+CeoCDg3p6fIGFfXp/gYR9dYN/gX57e359foJ9foGAf357gICAfIJ7fn16hoV6fXyAgX+Bfn5+gnl5gYSBfH19e4h7fISEeIB+gH+Ed3+Cf3p6hX2Af3qAfX5/fn98f4GBgHt3gYZ/fX99gHx8gH97hoR3gX5/g3l+g31/g315f4N8fX+AgX6Af35+gH6AgX97foCCfX99gn1+gYF7gIR9en+DgH59f319gYB8fn1/f32Be3uCgXx+fYR/fH2Cf31+foKEfHyBg31/fn5/goJ7gIaAfX9/gn+Bgn56g4J/goF/foB/gIB/fn+Bf3uAgn96f398gIB/fnyAgHx9fn5+f3p+gnx9f3x/f398f399gH9/fn6Df3yBf39/gIB9f4F/gYF+f4CCfoF/f4KCgICAf4KAg4B+f4KCfX59goN9fYB/gIB6gH99fICAfX1/gnx7fYB/gXx9fn5/fn99fX5+fX5+fn5/f39/gX5/gnx+gIF/foCCfn2Af4J+foGBgX9/f4CCfIGAgYF/f36AgYB+gIGAgH2AgX99gH9/gH2Af3+AfXx9gHx+fHyAfX5+fH2Agnt7f35/fX9/f39/fXp+gH5+goB9f39/gn59gX+Af31/gIB/f39/gH6AgICBfoCEf4B+f4KBf4B/gYGDfn+Af4B/fn59foF+foKBfn9+fHyAfn5+fn+BeX+Fg3N7hX58gH+Afn6FdHuIgnh+g4B6e4iGeHqFhXh7g3+Af36Ag4SAeX+Een1+g4V7en6Ef3+AgX9/f4B+fHx+foJ/fH6ChHx9foGBg3t5foJ/f3x+fYF+f31+gICBgX5/f4F+fn5/fX59fn9+gIOAf3+Af4B9fn9+gX9+gX+BfoGBgIB/f31/gn+CfIB/fYF+f36Bf35/foB/f398gX+Af31/f4CBf358gIKAfn9+gn2Af35+gn99f36Bf31+f3+Af399f4CBfoCAfX+BfX+AgH6AgH9+gIZ9fYJ/iIB3fIt/dISBgHx/f4OFf32AgX53fIOCe4KBfn2Ben57f3t4f4N9gH6BgYKAgHl/gn1/f4N/f36DgoCBfoJ+eX17gH18e4F/fYB+hX6Dg4OBgIB8fHt+f39+fX9/foKBgIGEf31/gX6AgoGDfoCEf32BAA==";
      audio.volume = audioVolume;
      audio.play();
      audio.remove();
      return true;
    } else {
      return false;
    }
  };

  root.santasLittleHelper.audio.beep = function() {
    var audio;
    if (!muteAudio) {
      if (isFunction(root.santasLittleHelper.audio.callBack)) {
        root.santasLittleHelper.audio.callBack("play", "beep", audioVolume);
      }
      audio = document.createElement("audio");
      audio.src = "data:audio/wav;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7ksCKgBOhUsgHvM2IAAAlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7ksD/gAAAASwAAAAAAAAlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7ksD/gAAAASwAAAAAAAAlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA//uSwP+AAAABLAAAAAAAACWAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAA==";
      audio.volume = audioVolume;
      audio.play();
      audio.remove();
      return true;
    } else {
      return false;
    }
  };

  /*
   DOM Section
  */


  root.santasLittleHelper.DOM = function() {
    return true;
  };

  root.santasLittleHelper.DOM.hasClass = function(element, cssClass) {
    return element.className.match(new RegExp("(\\s|^)" + cssClass + "(\\s|$)"));
  };

  root.santasLittleHelper.DOM.addClass = function(element, cssClass) {
    if (!root.santasLittleHelper.DOM.hasClass(element, cssClass)) {
      return element.className += " " + cssClass;
    }
  };

  root.santasLittleHelper.DOM.removeClass = function(element, cssClass) {
    var reg;
    if (hasClass(element, cssClass)) {
      reg = new RegExp("(\\s|^)" + cssClass + "(\\s|$)");
      return element.className = element.className.replace(reg, " ");
    }
  };

  root.String.prototype.toCapitalCase = function() {
    var i, re, words;
    re = /\s/g;
    words = this.split(re);
    re = /(\S)(\S+)/;
    i = words.length - 1;
    while (i >= 0) {
      re.exec(words[i]);
      words[i] = RegExp.$1.toUpperCase() + RegExp.$2.toLowerCase();
      i--;
    }
    return words.join(" ");
  };

  root.String.prototype.toCamelCase = function() {
    var i, re, words;
    re = /\s/;
    words = this.split(re);
    re = /(\S)(\S+)/;
    i = words.length - 1;
    while (i >= 0) {
      re.exec(words[i]);
      words[i] = RegExp.$1.toUpperCase() + RegExp.$2.toLowerCase();
      i--;
    }
    return words.join("").replace(/[^a-z\d\s]+/g, "");
  };

  root.String.prototype.tolowerCamelCase = function() {
    var i, re, words;
    re = /\s/;
    words = this.split(re);
    re = /(\S)(\S+)/;
    words[0] = words[0].toLowerCase();
    i = words.length - 1;
    while (i >= 1) {
      re.exec(words[i]);
      words[i] = RegExp.$1.toUpperCase() + RegExp.$2.toLowerCase();
      i--;
    }
    return words.join("").replace(/[^a-z\d\s]+/g, "");
  };

  root.String.prototype.toSnakeCase = function() {
    return this.replace(/[^a-z\d\s]+/g, "").replace(RegExp(" ", "g"), "_").toUpperCase();
  };

  root.Array.prototype.sortByObjectProperty = function(PropertyName) {
    return this.sort(function(a, b) {
      var nameA, nameB;
      nameA = eval("a." + PropertyName);
      try {
        nameA = a[PropertyName];
      } catch (e) {
        nameA = null;
      }
      if (typeof nameA === "undefine") {
        nameA = null;
      }
      try {
        nameB = b[PropertyName];
      } catch (e) {
        nameB = null;
      }
      if (typeof nameB === "undefine") {
        nameB = null;
      }
      if ((nameB != null) && !(nameA != null)) {
        return 1;
      }
      if ((nameA != null) && !(nameB != null)) {
        return -1;
      }
      if (!(nameA != null) && !(nameB != null)) {
        return 0;
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

}).call(this);
