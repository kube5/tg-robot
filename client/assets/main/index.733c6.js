System.register("chunks:///_virtual/AirBoatAnimation.ts", ['cc', './ResLoader.ts', './UtilsBezier.ts', './Utils.ts', './GameDataManager.ts'], function (exports) {
  var cclegacy, _decorator, instantiate, v3, tween, Animation, isValid, UIOpacity, ResLoader, ResType, UtilsBezier, Utils, GameDataManager;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      v3 = module.v3;
      tween = module.tween;
      Animation = module.Animation;
      isValid = module.isValid;
      UIOpacity = module.UIOpacity;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }, function (module) {
      UtilsBezier = module.default;
    }, function (module) {
      Utils = module.default;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "884f9KLWAlFUb0Qb3S1ddtp", "AirBoatAnimation", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AirBoatAnimation = exports('AirBoatAnimation', /*#__PURE__*/function () {
        function AirBoatAnimation(pos, parent, _finishCall) {
          var _this = this;
          this.finishCall = void 0;
          this.boatNode = void 0;
          this.finishCall = _finishCall;
          ResLoader.instance.load("airboat", ResType.Prefab, function (prefab) {
            var _node$getComponent;
            var node = instantiate(prefab);
            node.setPosition(v3(pos.x - 100, pos.y, pos.z));
            (_node$getComponent = node.getComponent(UIOpacity)) != null ? _node$getComponent : node.addComponent(UIOpacity);
            node.getComponent(UIOpacity).opacity = 0;
            _this.boatNode = node;
            tween(node.getComponent(UIOpacity)).to(0.5, {
              opacity: 255
            }).start();
            tween(node).to(0.5, {
              position: pos
            }).start();
            var _loop = function _loop(i) {
              setTimeout(function () {
                _this.createBomb(node, pos, i);
              }, 500 + 200 * i);
            };
            for (var i = 0; i < 5; i++) {
              _loop(i);
            }
            node.parent = parent;
          });
        }
        var _proto = AirBoatAnimation.prototype;
        _proto.createBomb = function createBomb(boatNode, targetPos, index) {
          var _this2 = this;
          var parent = boatNode.parent;
          var pos = boatNode.position.clone();
          ResLoader.instance.load("airboat-bomb", ResType.Prefab, function (prefab) {
            var node = instantiate(prefab);
            node.setPosition(pos);
            node.parent = parent;
            var dst = targetPos.clone().add3f(Utils.randomRange(0, 300), Utils.randomRange(-900, -1000), 0);
            node.scale = v3();
            tween(node).to(1, {
              scale: v3(1, 1, 1),
              angle: Utils.randomRange(-90, 90)
            }).call(function () {
              return _this2.createEffect(node, index);
            }).start();
            UtilsBezier.bezierTo(node, 1, pos, pos.clone().add3f(50, 0, 0), dst).start();
          });
        };
        _proto.createEffect = function createEffect(bombNode, index) {
          var _this3 = this;
          var parent = bombNode.parent;
          var pos = bombNode.position.clone();
          bombNode.removeFromParent();
          bombNode.destroy();
          ResLoader.instance.load("airboat-boom", ResType.Prefab, function (prefab) {
            var node = instantiate(prefab);
            node.parent = parent;
            node.setPosition(pos);
            node.getComponent(Animation).on(Animation.EventType.FINISHED, function () {
              node.removeFromParent();
              node.destroy();
              if (index == 4) {
                if (_this3.finishCall) _this3.finishCall();
              } else if (index == 3) {
                _this3.exit();
              }
            });
          });
        };
        _proto.exit = function exit() {
          var _this4 = this;
          if (this.boatNode && isValid(this.boatNode)) {
            tween(this.boatNode).by(0.5, {
              position: v3(150, 0, 0)
            }).start();
            tween(this.boatNode.getComponent(UIOpacity)).to(0.5, {
              opacity: 0
            }).call(function () {
              _this4.boatNode.removeFromParent();
              _this4.boatNode.destroy();
              GameDataManager.getInstance().invasionVfxState.set(1);
            }).start();
          }
        };
        return AirBoatAnimation;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AssetGold.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './Utils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, Component, GameDataManager, Utils;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      Utils = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "f9459+uxXtN9Icts6EJYxJZ", "AssetGold", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AssetScore = exports('AssetScore', (_dec = ccclass('AssetScore'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AssetScore, _Component);
        function AssetScore() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = AssetScore.prototype;
        _proto.start = function start() {
          this.updateAsset(GameDataManager.getInstance().data.gold.cur);
          GameDataManager.getInstance().data.gold.addChangeListener(this.updateAsset, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().data.gold.removeChangeListener(this.updateAsset, this);
        };
        _proto.updateAsset = function updateAsset(cur, last) {
          var label = this.node.getComponentInChildren(Label);
          if (last != null && cur != last) Utils.updateUniNumberAnim(last, cur, label, 0.5);else label.string = Utils.toThousands(cur);
        };
        return AssetScore;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AssetShield.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, GameDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ee1abtV/0hJ5ITdWldBtSJU", "AssetShield", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AssetShield = exports('AssetShield', (_dec = ccclass('AssetShield'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AssetShield, _Component);
        function AssetShield() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = AssetShield.prototype;
        _proto.start = function start() {
          this.updateAsset(GameDataManager.getInstance().data.shield.cur);
          GameDataManager.getInstance().data.shield.addChangeListener(this.updateAsset, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().data.shield.removeChangeListener(this.updateAsset, this);
        };
        _proto.updateAsset = function updateAsset(cur, last) {
          var layout = this.node.children[1];
          layout.children.forEach(function (item, index) {
            item.active = index < cur;
          });
        };
        return AssetShield;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AssetSoul.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './Utils.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, Component, GameDataManager, Utils;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      Utils = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "82453Dd1qNJy7x+N2YAOliz", "AssetSoul", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AssetSoul = exports('AssetSoul', (_dec = ccclass('AssetSoul'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AssetSoul, _Component);
        function AssetSoul() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = AssetSoul.prototype;
        _proto.start = function start() {
          this.updateAsset(GameDataManager.getInstance().data.soul.cur);
          GameDataManager.getInstance().data.soul.addChangeListener(this.updateAsset, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().data.soul.removeChangeListener(this.updateAsset, this);
        };
        _proto.updateAsset = function updateAsset(cur, last) {
          var label = this.node.getComponentInChildren(Label);
          if (last != null && cur != last) Utils.updateUniNumberAnim(last, cur, label, 0.5);else label.string = Utils.toThousands(cur);
        };
        return AssetSoul;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './GlobalConfig.ts', './Utils.ts', './UserSettingComponent.ts', './ResLoader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, AudioSource, Component, GlobalEventManager, GlobalEvent, Utils, UserSettingComponent, ResLoader, ResType;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSource = module.AudioSource;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }, function (module) {
      Utils = module.default;
    }, function (module) {
      UserSettingComponent = module.default;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }],
    execute: function () {
      var _dec, _class2, _class3, _descriptor, _class4;
      cclegacy._RF.push({}, "4be01lal0ZLrKQycodG3q+c", "AudioComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AudioData = function AudioData(_clip, _loop) {
        this.clip = void 0;
        this.loop = void 0;
        this.clip = _clip;
        this.loop = _loop;
      };
      var AudioComponent = exports('AudioComponent', (_dec = ccclass('AudioComponent'), _dec(_class2 = (_class3 = (_class4 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioComponent, _Component);
        function AudioComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "maxAudioChannel", _descriptor, _assertThisInitialized(_this));
          _this.musicAudioSource = null;
          _this.clips = [];
          _this.audioSourcePool = [];
          _this.audioClipCache = [];
          return _this;
        }
        var _proto = AudioComponent.prototype;
        _proto.onLoad = function onLoad() {
          AudioComponent.instance = this;
          this.musicAudioSource = this.node.addComponent(AudioSource);
          this.musicAudioSource.playOnAwake = false;
          GlobalEventManager.getInstance().on(GlobalEvent.AudioPreloaded, this.onAudioPreloadedListener, this);
        };
        _proto.start = function start() {
          var _this2 = this;
          this.setMusicMute(UserSettingComponent.instance.data.musicMute.cur);
          UserSettingComponent.instance.data.musicMute.addChangeListener(function (cur) {
            _this2.setMusicMute(cur);
          }, this);
          UserSettingComponent.instance.data.musicVolume.addChangeListener(function (cur) {
            _this2.musicAudioSource.volume = cur;
          }, this);
        };
        _proto.update = function update(deltaTime) {
          var data = this.audioClipCache.shift();
          if (data) {
            this.playByAudioSource(data.clip, data.loop);
          }
        };
        _proto.onAudioPreloadedListener = function onAudioPreloadedListener(audios) {
          this.clips = this.clips.concat(audios);
        };
        _proto.play = function play(name, loop, wait) {
          var _this3 = this;
          if (loop === void 0) {
            loop = false;
          }
          var clip = this.getClip(name);
          if (clip) {
            this.addAudioCache(clip, loop, wait);
          } else {
            ResLoader.instance.load(name, ResType.Audio, function (clip) {
              _this3.addClip(clip);
              _this3.addAudioCache(clip, loop, wait);
            });
          }
        };
        _proto.stopAudio = function stopAudio(name) {
          var audio = this.audioSourcePool.find(function (t) {
            var _t$clip;
            return ((_t$clip = t.clip) == null ? void 0 : _t$clip.name) == name;
          });
          if (audio) {
            audio.stop();
          }
        };
        _proto.playMusic = function playMusic(name, loop, volume) {
          var _this4 = this;
          if (loop === void 0) {
            loop = true;
          }
          if (volume === void 0) {
            volume = null;
          }
          var clip = this.getClip(name);
          if (clip) {
            this.playByMusicSource(clip, loop, volume);
          } else {
            ResLoader.instance.load(name, ResType.Audio, function (clip) {
              _this4.addClip(clip);
              _this4.playByMusicSource(clip, loop, volume);
            });
          }
        };
        _proto.playMusicFromUrl = function playMusicFromUrl(url) {
          var _this5 = this;
          var name = Utils.getFileNameFromPath(url);
          var clip = this.getClip(name);
          if (clip) {
            this.playMusic(name);
          } else {
            ResLoader.instance.loadRemote(url, function (clip) {
              _this5.addClip(clip);
              _this5.playMusic(name);
            });
          }
        };
        _proto.playSoundFromUrl = function playSoundFromUrl(url, wait, loop) {
          var _this6 = this;
          if (loop === void 0) {
            loop = false;
          }
          var name = Utils.getFileNameFromPath(url);
          var clip = this.getClip(name);
          if (clip) {
            this.addAudioCache(clip, loop, wait);
          } else {
            ResLoader.instance.loadRemote(url, function (clip) {
              _this6.addClip(clip);
              _this6.addAudioCache(clip, loop, wait);
            });
          }
        };
        _proto.addAudioCache = function addAudioCache(clip, loop, wait) {
          if (wait) {
            //不重复播放
            var ret = this.audioClipCache.findIndex(function (t) {
              return t.clip.name == clip.name;
            }) >= 0;
            if (ret) return;
            for (var _iterator = _createForOfIteratorHelperLoose(this.audioSourcePool), _step; !(_step = _iterator()).done;) {
              var source = _step.value;
              if (source.clip.name == clip.name && source.playing) {
                return;
              }
            }
          }
          this.audioClipCache.push(new AudioData(clip, loop));
        };
        _proto.clearInvalidClip = function clearInvalidClip() {
          for (var i = this.clips.length - 1; i >= 0; i--) {
            if (!this.clips[i].isValid) this.clips.splice(i, 1);
          }
        };
        _proto.addClip = function addClip(clip) {
          if (!this.clips.find(function (t) {
            return t.name == clip.name;
          })) {
            this.clips.push(clip);
          }
        };
        _proto.getClip = function getClip(name) {
          return this.clips.find(function (t) {
            return t.name == name;
          });
        };
        _proto.playByAudioSource = function playByAudioSource(clip, loop) {
          if (loop === void 0) {
            loop = false;
          }
          var audioSource = this.getAudioSource();
          if (!audioSource) return;
          audioSource.clip = clip;
          audioSource.loop = loop;
          audioSource.volume = UserSettingComponent.instance.data.sfxMute.cur ? 0 : UserSettingComponent.instance.data.sfxVolume.cur;
          audioSource.play();
        };
        _proto.playByMusicSource = function playByMusicSource(clip, loop, volume) {
          if (loop === void 0) {
            loop = true;
          }
          if (volume === void 0) {
            volume = null;
          }
          this.musicAudioSource.stop();
          this.musicAudioSource.clip = clip;
          this.musicAudioSource.loop = loop;
          if (volume != null) this.musicAudioSource.volume = volume;
          this.musicAudioSource.play();
        };
        _proto.setMusicMute = function setMusicMute(mute) {
          this.musicAudioSource.volume = mute ? 0 : UserSettingComponent.instance.data.musicVolume.cur;
        };
        _proto.getAudioSource = function getAudioSource() {
          var audio = this.audioSourcePool.find(function (t) {
            return !t.playing;
          });
          if (!audio) {
            if (this.audioSourcePool.length >= this.maxAudioChannel) return;
            audio = this.node.addComponent(AudioSource);
            audio.playOnAwake = false;
            this.audioSourcePool.push(audio);
          }
          return audio;
        };
        return AudioComponent;
      }(Component), _class4.instance = void 0, _class4), _descriptor = _applyDecoratedDescriptor(_class3.prototype, "maxAudioChannel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _class3)) || _class2));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioPlayer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, AudioComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      AudioComponent = module.AudioComponent;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "f8305r51wxEDLql3sziUjsz", "AudioPlayer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var AudioPlayer = exports('default', (_dec = menu("1-Audio/AudioPlayer"), _dec2 = property({
        tooltip: "当有同名音效播放时不重复播放"
      }), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioPlayer, _Component);
        function AudioPlayer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "audioName", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isLoop", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playOnStart", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playOnEnable", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "delay", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "wait", _descriptor6, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = AudioPlayer.prototype;
        _proto.start = function start() {
          if (this.playOnStart) this.play();
        };
        _proto.onEnable = function onEnable() {
          if (this.playOnEnable) this.play();
        };
        _proto.play = function play() {
          var _this2 = this;
          if (this.delay) {
            this.scheduleOnce(function () {
              AudioComponent.instance.play(_this2.audioName, _this2.isLoop, _this2.wait);
            }, this.delay);
          } else AudioComponent.instance.play(this.audioName, this.isLoop, this.wait);
        };
        return AudioPlayer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isLoop", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playOnStart", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playOnEnable", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "delay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "wait", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AutoAdaptBg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, view, v3, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "12004rnMVBOX7HW++9AEcp6", "AutoAdaptBg", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var AutoAdaptBg = exports('default', (_dec = menu("1-UIAdaptive/AutoAdaptBg"), ccclass(_class = _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AutoAdaptBg, _Component);
        function AutoAdaptBg() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.srcScaleAdapt = v3();
          return _this;
        }
        var _proto = AutoAdaptBg.prototype;
        _proto.start = function start() {
          var ratioWidth = view.getVisibleSize().width / view.getDesignResolutionSize().width;
          var ratioHeight = view.getVisibleSize().height / view.getDesignResolutionSize().height;
          var ratio = ratioWidth > ratioHeight ? ratioWidth : ratioHeight;
          this.node.scale = this.node.scale.multiplyScalar(ratio);
          this.srcScaleAdapt.set(this.node.scale);
        }

        /**
         * 重置缩放系数
         */;
        _proto.resetScale = function resetScale() {
          this.node.setScale(this.srcScaleAdapt);
        };
        return AutoAdaptBg;
      }(Component)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AutoAdaptSprite.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, Node, UITransform, v3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Node = module.Node;
      UITransform = module.UITransform;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b4253/H/zJFp5Iafk06eJIU", "AutoAdaptSprite", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var AutoAdaptSprite = exports('default', (_dec = requireComponent(Sprite), _dec2 = menu("1-UIAdaptive/AutoAdaptSprite"), _dec3 = property(Node), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AutoAdaptSprite, _Component);
        function AutoAdaptSprite() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "limitWidth", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "limitHeight", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "limitNode", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = AutoAdaptSprite.prototype;
        _proto.onLoad = function onLoad() {
          if (this.limitNode) {
            this.limitWidth = this.limitNode.getComponent(UITransform).width;
            this.limitHeight = this.limitNode.getComponent(UITransform).height;
          }
          this.node.on(Node.EventType.SIZE_CHANGED, this.onSizeChanged, this);
        };
        _proto.start = function start() {
          this.adapt();
        };
        _proto.onSizeChanged = function onSizeChanged() {
          this.adapt();
        };
        _proto.adapt = function adapt() {
          var transform = this.node.getComponent(UITransform);
          var scale = transform.width < transform.height ? this.limitHeight / transform.height : this.limitWidth / transform.width;
          this.node.setScale(v3(scale, scale));
        };
        return AutoAdaptSprite;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "limitWidth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "limitHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "limitNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AutoReleaseBundle.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResLoader.ts', './AudioComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, Component, ResLoader, AudioComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      Component = module.Component;
    }, function (module) {
      ResLoader = module.ResLoader;
    }, function (module) {
      AudioComponent = module.AudioComponent;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "c2ef9dDa9pPgKdrnrAlz5IC", "AutoReleaseBundle", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AutoReleaseBundle = exports('AutoReleaseBundle', (_dec = ccclass('AutoReleaseBundle'), _dec2 = property([CCString]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AutoReleaseBundle, _Component);
        function AutoReleaseBundle() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "ignoreBundle", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = AutoReleaseBundle.prototype;
        _proto.start = function start() {
          ResLoader.instance.autoUnloadBundles(this.ignoreBundle);
          AudioComponent.instance.clearInvalidClip();
        };
        return AutoReleaseBundle;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "ignoreBundle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AvatarChangeHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GameDataManager, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1872fPI/l5ABKhfn4stcsJi", "AvatarChangeHandler", undefined);
      var AvatarChangeHandler = exports('AvatarChangeHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(AvatarChangeHandler, _NetWorkHandler);
        function AvatarChangeHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = AvatarChangeHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("msg!!", this.data);
          GameDataManager.getInstance().data.avatar.set(this.data.avatarNo);
        };
        return AvatarChangeHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AvatarComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './ResLoader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, Component, GameDataManager, ResLoader;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      ResLoader = module.ResLoader;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "f9cadsgt7NFB6oe4nw/q2P3", "AvatarComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AvatarComponent = exports('AvatarComponent', (_dec = ccclass('AvatarComponent'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AvatarComponent, _Component);
        function AvatarComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "autoUpdate", _descriptor, _assertThisInitialized(_this));
          _this.icon = null;
          return _this;
        }
        var _proto = AvatarComponent.prototype;
        _proto.start = function start() {
          this.icon = this.node.children[0].children[0].getComponent(Sprite);
          if (this.autoUpdate) {
            GameDataManager.getInstance().data.avatar.addChangeListener(this.onAvatarChange, this);
            this.changeAvatar(GameDataManager.getInstance().data.avatar.cur);
          }
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().data.avatar.removeChangeListener(this.onAvatarChange, this);
        };
        _proto.onAvatarChange = function onAvatarChange(cur, last) {
          this.changeAvatar(cur);
        };
        _proto.changeAvatar = function changeAvatar(aId) {
          var _this$icon;
          this.icon = (_this$icon = this.icon) != null ? _this$icon : this.node.children[0].children[0].getComponent(Sprite);
          if (aId == 0) {
            //TODO 请求用户飞机账户的头像
            ResLoader.instance.loadSpriteFrame(this.icon, "avatar_1");
          } else {
            ResLoader.instance.loadSpriteFrame(this.icon, "avatar_" + aId);
          }
        };
        return AvatarComponent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoUpdate", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AvatarView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts', './ListViewComponent.ts', './AvatarComponent.ts', './GameDataManager.ts', './UserNetRequest.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ViewComponent, ListViewComponent, AbsAdapter, AvatarComponent, GameDataManager, UserNetRequest;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }, function (module) {
      ListViewComponent = module.default;
      AbsAdapter = module.AbsAdapter;
    }, function (module) {
      AvatarComponent = module.AvatarComponent;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      UserNetRequest = module.UserNetRequest;
    }],
    execute: function () {
      var _dec, _dec2, _class2, _class3, _descriptor;
      cclegacy._RF.push({}, "d819eKkwrlGFpyOOAY7U6Dk", "AvatarView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ListAdapter = /*#__PURE__*/function (_AbsAdapter) {
        _inheritsLoose(ListAdapter, _AbsAdapter);
        function ListAdapter(data, _view) {
          var _this;
          _this = _AbsAdapter.call(this) || this;
          _this.view = void 0;
          _this.view = _view;
          _this.setDataSet(data);
          return _this;
        }
        var _proto = ListAdapter.prototype;
        _proto.updateView = function updateView(item, posIndex, data) {
          var avatar = item.getComponentInChildren(AvatarComponent);
          var selectIcon = item.getChildByName("avatar-ui-3");
          selectIcon.active = data == this.view.avatar;
          avatar.changeAvatar(data);
        };
        _proto.onClickItem = function onClickItem(item, data, index) {
          if (this.view.avatar == data) return;
          this.view.avatar = data;
          this.listview.notifyUpdate();
        };
        return ListAdapter;
      }(AbsAdapter);
      var AvatarView = exports('AvatarView', (_dec = ccclass('AvatarView'), _dec2 = property(ListViewComponent), _dec(_class2 = (_class3 = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(AvatarView, _ViewComponent);
        function AvatarView() {
          var _this2;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this2 = _ViewComponent.call.apply(_ViewComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this2, "list", _descriptor, _assertThisInitialized(_this2));
          _this2.avatar = 0;
          return _this2;
        }
        var _proto2 = AvatarView.prototype;
        _proto2.start = function start() {
          this.avatar = GameDataManager.getInstance().data.avatar.cur;
          var data = [];
          for (var i = 0; i < 9; i++) data.push(i);
          this.list.setAdapter(new ListAdapter(data, this));
        };
        _proto2.onClickSave = function onClickSave() {
          UserNetRequest.changeAvatar(this.avatar);
          GameDataManager.getInstance().data.avatar.set(this.avatar);
        };
        return AvatarView;
      }(ViewComponent), _descriptor = _applyDecoratedDescriptor(_class3.prototype, "list", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class3)) || _class2));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseInfoHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GameDataManager, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d1dffhKBWhJXY2f1i8QyZAx", "BaseInfoHandler", undefined);
      var BaseInfoHandler = exports('BaseInfoHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(BaseInfoHandler, _NetWorkHandler);
        function BaseInfoHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = BaseInfoHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("BaseInfoHandler!!", this.data);
          GameDataManager.getInstance().diceMax = this.data.totalDiceCount;
          GameDataManager.getInstance().data.dice.set(this.data.currentDiceCount);
          // GameDataManager.getInstance().data.soul.set(this.data.soulCount);
          // // GameDataManager.getInstance().data.gold.set(this.data.goldCoin);
          // GameDataManager.getInstance().data.shield.set(this.data.shieldCount);
          // GlobalEventManager.getInstance().emit(UIEvent.CacheReward, AssetCode.Gold, this.data.goldCoin, false);
        };

        return BaseInfoHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Board.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Character.ts', './GameDataManager.ts', './GlobalEventManager.ts', './Constants.ts', './RollLogic.ts', './UIConstant.ts', './NetComponent.ts', './BoardEffectNode.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, tween, UIOpacity, v3, Component, Character, GameDataManager, GlobalEventManager, GameEvent, RollState, CacheRewardScene, RollLogic, UIEvent, NetComponent, BoardEffectMode;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      v3 = module.v3;
      Component = module.Component;
    }, function (module) {
      Character = module.Character;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
      RollState = module.RollState;
      CacheRewardScene = module.CacheRewardScene;
    }, function (module) {
      RollLogic = module.RollLogic;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      NetComponent = module.NetComponent;
    }, function (module) {
      BoardEffectMode = module.BoardEffectMode;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "be1989xjc9Ht5EyZytLqjb1", "Board", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Board = exports('Board', (_dec = ccclass('Board'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Board, _Component);
        function Board() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.character = void 0;
          _this.curIndex = 0;
          _this.grids = [];
          _this.step = 0;
          return _this;
        }
        var _proto = Board.prototype;
        _proto.start = function start() {
          var _this2 = this;
          var gridsLayer = this.node.getChildByName("grids");
          gridsLayer.children.forEach(function (grid) {
            _this2.grids.push(grid);
          });
          this.grids = this.grids.sort(function (a, b) {
            return Number(a.name.split("_")[1]) - Number(b.name.split("_")[1]);
          });
          this.character = this.node.getChildByName("char").getComponent(Character);
          this.curIndex = GameDataManager.getInstance().data.pos.cur - 1;
          var grid = this.grids[this.curIndex];
          this.character.node.setPosition(grid.position.clone().add3f(0, 54, 0));
          this.character.setDirection(this.curIndex > 5 && this.curIndex < 16 ? -1 : 1);
          GlobalEventManager.getInstance().on(GameEvent.CharacterJump, this.onJump, this);
          GlobalEventManager.getInstance().on(GameEvent.BoardEffect, this.onBoardEffect, this);
          GameDataManager.getInstance().invasion.addChangeListener(this.onInvasionListener, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
          GameDataManager.getInstance().invasion.removeChangeListener(this.onInvasionListener, this);
        };
        _proto.update = function update(deltaTime) {};
        _proto.onInvasionListener = function onInvasionListener(cur) {
          if (cur == 0) {
            tween(this.character.node.getComponent(UIOpacity)).to(0.2, {
              opacity: 255
            }).start();
          }
        };
        _proto.onBoardEffect = function onBoardEffect(mode) {
          if (mode == BoardEffectMode.IntrusionDoor) {
            tween(this.character.node.getComponent(UIOpacity)).to(0.2, {
              opacity: 0
            }).start();
          }
        };
        _proto.onJump = function onJump(totalPoint) {
          this.step = totalPoint - 1;
          RollLogic.getInstance().rollState.addState(RollState.CharacterJumping);
          if (NetComponent.instance.localDebug) GameDataManager.getInstance().data.pos.add(this.step);
          this.schedule(this.jump, 0.2, this.step);
        };
        _proto.jump = function jump() {
          this.step--;
          var fromNode = this.grids[this.curIndex];
          this.curIndex++;
          if (this.curIndex >= this.grids.length) this.curIndex = 0;
          var toNode = this.grids[this.curIndex];
          var nextPos = toNode.position.clone().add3f(0, 54, 0);
          this.character.node.setPosition(fromNode.position.clone().add3f(0, 54, 0));
          this.character.setDirection(this.curIndex > 5 && this.curIndex < 16 ? -1 : 1);
          this.character.jump();
          tween(this.character.node).to(0.2, {
            position: nextPos
          }).start();
          var sinkY = 20;
          var step = this.step;
          tween(this.character.node).delay(0.2).by(0.05, {
            position: v3(0, -sinkY, 0)
          }).by(0.05, {
            position: v3(0, sinkY, 0)
          }).call(function () {
            if (step < 0) {
              RollLogic.getInstance().rollState.removeState(RollState.CharacterJumping);
              GlobalEventManager.getInstance().emit(UIEvent.SyncCachedReward, CacheRewardScene.FromRolling);
            }
          }).start();
          tween(toNode).delay(0.2).by(0.05, {
            position: v3(0, -sinkY, 0)
          }).by(0.05, {
            position: v3(0, sinkY, 0)
          }).start();
        };
        return Board;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardEffectNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './ResLoader.ts', './NodePool.ts', './SwitchState.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Animation, instantiate, Component, GlobalEventManager, GameEvent, ResLoader, ResType, NodePool, SwitchState;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Animation = module.Animation;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }, function (module) {
      NodePool = module.NodePool;
    }, function (module) {
      SwitchState = module.SwitchState;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "0864eY5unZJvJ8e0LNOF7jr", "BoardEffectNode", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BoardEffectMode = exports('BoardEffectMode', /*#__PURE__*/function (BoardEffectMode) {
        BoardEffectMode[BoardEffectMode["None"] = 0] = "None";
        BoardEffectMode[BoardEffectMode["GoldReward"] = 1] = "GoldReward";
        BoardEffectMode[BoardEffectMode["IntrusionDoor"] = 2] = "IntrusionDoor";
        return BoardEffectMode;
      }({}));
      var BoardEffectNode = exports('BoardEffectNode', (_dec = ccclass('BoardEffectNode'), _dec2 = property([Node]), _dec3 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoardEffectNode, _Component);
        function BoardEffectNode() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "vfxLayer", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "character", _descriptor2, _assertThisInitialized(_this));
          _this.coinVfxPool = new NodePool();
          _this.intrusionVfxPool = new NodePool();
          return _this;
        }
        var _proto = BoardEffectNode.prototype;
        _proto.start = function start() {
          GlobalEventManager.getInstance().on(GameEvent.BoardEffect, this.onBoardEffect, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.onBoardEffect = function onBoardEffect(mode) {
          switch (mode) {
            case BoardEffectMode.GoldReward:
              this.showGoldReward();
              break;
            case BoardEffectMode.IntrusionDoor:
              this.showIntrusionDoor();
              break;
          }
        };
        _proto.showGoldReward = function showGoldReward() {
          var _this2 = this;
          var node = this.coinVfxPool.get();
          BoardEffectNode.vfxState.addState(BoardEffectMode.GoldReward);
          if (node) {
            node.getComponent(Animation).play();
            node.setPosition(this.character.position);
          } else {
            ResLoader.instance.load("vfx-coin-reward", ResType.Prefab, function (d) {
              var node = instantiate(d);
              node.parent = _this2.vfxLayer[0];
              node.getComponent(Animation).play();
              node.setPosition(_this2.character.position);
              node.getComponent(Animation).on(Animation.EventType.FINISHED, function () {
                BoardEffectNode.vfxState.removeState(BoardEffectMode.GoldReward);
                _this2.coinVfxPool.put(node);
              });
            });
          }
        };
        _proto.showIntrusionDoor = function showIntrusionDoor() {
          var _this3 = this;
          var node = this.intrusionVfxPool.get();
          BoardEffectNode.vfxState.addState(BoardEffectMode.IntrusionDoor);
          if (node) {
            node.getComponent(Animation).play();
            node.setPosition(this.character.position);
          } else {
            ResLoader.instance.load("vfx-intrusion-door", ResType.Prefab, function (d) {
              var node = instantiate(d);
              node.parent = _this3.vfxLayer[1];
              node.setPosition(_this3.character.position);
              node.getComponent(Animation).play();
              node.getComponent(Animation).on(Animation.EventType.FINISHED, function () {
                BoardEffectNode.vfxState.removeState(BoardEffectMode.IntrusionDoor);
                _this3.intrusionVfxPool.put(node);
              });
            });
          }
        };
        return BoardEffectNode;
      }(Component), _class3.vfxState = new SwitchState(), _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "vfxLayer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "character", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardGrid.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "6983cKUlr1FzKk+iLq4vFDm", "BoardGrid", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BoardGrid = exports('BoardGrid', (_dec = ccclass('BoardGrid'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoardGrid, _Component);
        function BoardGrid() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = BoardGrid.prototype;
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {};
        return BoardGrid;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuffActiveHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NetWorkHandler.ts', './GameNetRequest.ts'], function (exports) {
  var _inheritsLoose, cclegacy, NetWorkHandler, GameNetRequest;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4bc17m+j0ZBVrlCKQof2pYf", "BuffActiveHandler", undefined);
      var BuffActiveHandler = exports('BuffActiveHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(BuffActiveHandler, _NetWorkHandler);
        function BuffActiveHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = BuffActiveHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("BuffActiveHandler!!", this.data);
          GameNetRequest.getCardsInfo();
        };
        return BuffActiveHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuffBaseConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResPreLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, ResPreLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResPreLoader = module.ResPreLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "83ddakkkORNBqMUu0UhkqyD", "BuffBaseConfig", undefined);
      var BuffBaseConfigData = exports('BuffBaseConfigData', function BuffBaseConfigData() {
        this.id = void 0;
        this.name = void 0;
        this.path = void 0;
        this.info = void 0;
        this.type = void 0;
      });
      var BuffBaseConfig = exports('BuffBaseConfig', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(BuffBaseConfig, _Singleton);
        function BuffBaseConfig() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = void 0;
          _this.data = ResPreLoader.instance.getConfig("BuffBaseJson").json;
          return _this;
        }
        var _proto = BuffBaseConfig.prototype;
        _proto.getDataById = function getDataById(id) {
          return this.data.find(function (item) {
            return item.id == id;
          });
        };
        _proto.getDataByType = function getDataByType(type) {
          return this.data.find(function (item) {
            return item.type == type;
          });
        };
        return BuffBaseConfig;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuffLayer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './SpriteFrameComponent.ts', './ResLoader.ts', './BuffBaseConfig.ts', './CardsDataManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Sprite, Component, GlobalEventManager, GameEvent, SpriteFrameComponent, ResLoader, BuffBaseConfig, CardsDataManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      SpriteFrameComponent = module.default;
    }, function (module) {
      ResLoader = module.ResLoader;
    }, function (module) {
      BuffBaseConfig = module.BuffBaseConfig;
    }, function (module) {
      CardsDataManager = module.CardsDataManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "ed3f3ZS7nRPzZxO2w2dUTNS", "BuffLayer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BuffLayer = exports('BuffLayer', (_dec = ccclass('BuffLayer'), _dec2 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuffLayer, _Component);
        function BuffLayer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "itemBuffs", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = BuffLayer.prototype;
        _proto.onLoad = function onLoad() {
          this.onBuffRefresh(CardsDataManager.getInstance().buffs);
          GlobalEventManager.getInstance().on(GameEvent.BuffRefresh, this.onBuffRefresh, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().off(GameEvent.BuffRefresh, this.onBuffRefresh, this);
        };
        _proto.onBuffRefresh = function onBuffRefresh(buffs) {
          for (var i = 0; i < this.itemBuffs.length; i++) {
            var item = this.itemBuffs[i];
            item.active = i < buffs.length;
            if (!item.active) continue;
            var buffData = buffs[i];
            var iconBuff = void 0;
            var buffCfg = BuffBaseConfig.getInstance().getDataByType(buffData.type);
            if (item.getChildByName("icon-buff")) {
              iconBuff = item.getChildByName("icon-buff").getComponent(Sprite);
              var iconType = item.getChildByName("common-1").getComponent(SpriteFrameComponent);
              var iconLv = item.getChildByName("Lv1").getComponent(SpriteFrameComponent);
              iconType.setFrameByIndex(buffData.type - 1);
              iconLv.setFrameByIndex(buffData.level);
            } else {
              iconBuff = item.getComponent(Sprite);
            }
            ResLoader.instance.loadSpriteFrame(iconBuff, "icon_buff_" + buffCfg.path.split("_")[buffData.level == 4 ? 2 : 1]);
          }
        };
        return BuffLayer;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemBuffs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuffLevelConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResPreLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, ResPreLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResPreLoader = module.ResPreLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "14283GnNpxL0YjAan01oV/s", "BuffLevelConfig", undefined);
      var BuffLevelConfigData = exports('BuffLevelConfigData', function BuffLevelConfigData() {
        this.id = void 0;
        this.buffId = void 0;
        this.level = void 0;
        this.gate = void 0;
      });
      var BuffLevelConfig = exports('BuffLevelConfig', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(BuffLevelConfig, _Singleton);
        function BuffLevelConfig() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = void 0;
          _this.data = ResPreLoader.instance.getConfig("BuffLevelJson").json;
          return _this;
        }
        var _proto = BuffLevelConfig.prototype;
        _proto.getDataById = function getDataById(id) {
          return this.data.find(function (item) {
            return item.id == id;
          });
        };
        return BuffLevelConfig;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildBaseConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResPreLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, ResPreLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResPreLoader = module.ResPreLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "97ce45zcPBDorYLLEMuVOIX", "BuildBaseConfig", undefined);
      var BuildBaseConfigData = exports('BuildBaseConfigData', function BuildBaseConfigData() {
        this.id = void 0;
        this.storey = void 0;
        this.path = void 0;
        this.isMax = void 0;
        this.style = void 0;
      });
      var BuildBaseConfig = exports('BuildBaseConfig', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(BuildBaseConfig, _Singleton);
        function BuildBaseConfig() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = void 0;
          _this.data = ResPreLoader.instance.getConfig("BuildBaseJson").json;
          return _this;
        }
        var _proto = BuildBaseConfig.prototype;
        _proto.getDataById = function getDataById(id) {
          return this.data.find(function (item) {
            return item.id == id;
          });
        };
        _proto.getStoreyBuildings = function getStoreyBuildings(storey) {
          return this.data.filter(function (item) {
            var _item$storey$split;
            return ((_item$storey$split = item.storey.split("_")) == null ? void 0 : _item$storey$split.indexOf(storey + "")) !== -1;
          });
        };
        _proto.isBigBuilding = function isBigBuilding(gid) {
          return this.data.findIndex(function (t) {
            return t.path == gid.toString() && t.isMax;
          }) !== -1;
        };
        _proto.getRandomBuilding = function getRandomBuilding(storey) {
          var buildings = this.getStoreyBuildings(storey);
          return buildings[Math.floor(Math.random() * buildings.length)];
        };
        return BuildBaseConfig;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildButtonPrice.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuildingDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, Component, BuildingDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "89a2eGucv9H6r0byn7uFTHl", "BuildButtonPrice", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BuildButtonPrice = exports('BuildButtonPrice', (_dec = ccclass('BuildButtonPrice'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuildButtonPrice, _Component);
        function BuildButtonPrice() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = BuildButtonPrice.prototype;
        _proto.onLoad = function onLoad() {
          BuildingDataManager.getInstance().rebuiltGold.addChangeListener(this.onPriceChangeLisetner, this);
          BuildingDataManager.getInstance().buildingGold.addChangeListener(this.onPriceChangeLisetner, this);
        };
        _proto.onDestroy = function onDestroy() {
          BuildingDataManager.getInstance().rebuiltGold.removeChangeListener(this.onPriceChangeLisetner, this);
          BuildingDataManager.getInstance().buildingGold.removeChangeListener(this.onPriceChangeLisetner, this);
        };
        _proto.onPriceChangeLisetner = function onPriceChangeLisetner(value) {
          this.node.getComponent(Label).string = value.toString();
        };
        return BuildButtonPrice;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildGoldConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResPreLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, ResPreLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResPreLoader = module.ResPreLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4bef1nUlZNKlL76vHQtjh+3", "BuildGoldConfig", undefined);
      var BuildGoldConfigData = exports('BuildGoldConfigData', function BuildGoldConfigData() {
        this.id = void 0;
        this.goldCoin = void 0;
        this.storey = void 0;
        this.count = void 0;
      });
      var BuildGoldConfig = exports('BuildGoldConfig', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(BuildGoldConfig, _Singleton);
        function BuildGoldConfig() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = void 0;
          _this.data = ResPreLoader.instance.getConfig("BuildGoldJson").json;
          return _this;
        }
        var _proto = BuildGoldConfig.prototype;
        _proto.getDataById = function getDataById(id) {
          return this.data.find(function (item) {
            return item.id == id;
          });
        };
        _proto.getPrice = function getPrice(buildCount, storey) {
          var _this$data$find;
          return (_this$data$find = this.data.find(function (t) {
            return t.count == buildCount && t.storey == storey;
          })) == null ? void 0 : _this$data$find.goldCoin;
        };
        return BuildGoldConfig;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildingBg.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './ResLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Sprite, Component, GlobalEventManager, GameEvent, ResLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      ResLoader = module.ResLoader;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "7a3ebCtM/1DZI8hBYITcTon", "BuildingBg", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BuildingBg = exports('BuildingBg', (_dec = ccclass('BuildingBg'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuildingBg, _Component);
        function BuildingBg() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.lastStyle = 1;
          return _this;
        }
        var _proto = BuildingBg.prototype;
        _proto.start = function start() {
          GlobalEventManager.getInstance().on(GameEvent.UpdateBg, this.onUpdateBg, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().off(GameEvent.UpdateBg, this.onUpdateBg, this);
        };
        _proto.update = function update(deltaTime) {};
        _proto.onUpdateBg = function onUpdateBg(style) {
          if (this.lastStyle == style) return;
          this.lastStyle = style;
          ResLoader.instance.loadSpriteFrame(this.node.getComponent(Sprite), "L" + style + "_BG");
        };
        return BuildingBg;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildingDataManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './GlobalEventManager.ts', './Constants.ts', './ExInteger.ts', './GameNetRequest.ts', './NetComponent.ts', './BuildBaseConfig.ts', './UIConstant.ts', './ViewPortFollow.ts'], function (exports) {
  var _inheritsLoose, cclegacy, v2, Singleton, GlobalEventManager, GameEvent, ExInteger, GameNetRequest, NetComponent, BuildBaseConfig, UIEvent, ViewPortFollow;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      v2 = module.v2;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      ExInteger = module.default;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }, function (module) {
      NetComponent = module.NetComponent;
    }, function (module) {
      BuildBaseConfig = module.BuildBaseConfig;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      ViewPortFollow = module.ViewPortFollow;
    }],
    execute: function () {
      cclegacy._RF.push({}, "15008fWKV5HJ5AvApge1xSs", "BuildingDataManager", undefined);
      var BuildingDataManager = exports('BuildingDataManager', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(BuildingDataManager, _Singleton);
        function BuildingDataManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          /**当前层 */
          _this.storey = 0;
          /**总层数 */
          _this.totalStorey = 1;
          /**修建次数 */
          _this.buildCount = new ExInteger().init(0, 30);
          /**需要维修 */
          _this.needRebuilt = new ExInteger().init(0);
          _this.rebuiltGold = new ExInteger().init(0);
          _this.buildingGold = new ExInteger().init(0);
          _this.buildingVfx = new ExInteger().init(0);
          /**可建筑位置 由3位数组成的ID，解析时
           * 百位1代表是map上building层的位置，2代表buildingOutline层的位置，map内部有遮挡关系所以有两层建筑区
           * 十位代表可建造的3块矩阵区域的索引下标
           * 个位代表矩阵内具体位置索引下标 */
          _this.canBuildingPos = [];
          /**对应map中的建筑坐标 */
          _this.buildingPos = [[v2(0, 11), v2(1, 12), v2(1, 13), v2(1, 10), v2(1, 11), v2(2, 12), v2(1, 9), v2(2, 10), v2(2, 11)], [v2(2, 14), v2(2, 15), v2(3, 16), v2(2, 13), v2(3, 14), v2(3, 15), v2(3, 12), v2(3, 13), v2(4, 14)], [v2(3, 11), v2(4, 12), v2(4, 13), v2(4, 10), v2(4, 11), v2(5, 12), v2(4, 9), v2(5, 10), v2(5, 11)]];
          return _this;
        }
        var _proto = BuildingDataManager.prototype;
        _proto.addValidBuildingPos = function addValidBuildingPos(posStr) {
          this.canBuildingPos.push(posStr);
        };
        _proto.deleteValidBuildingPos = function deleteValidBuildingPos(posStr) {
          var index = this.canBuildingPos.indexOf(posStr);
          if (index != -1) this.canBuildingPos.splice(index, 1);
        };
        _proto.clearBuildingPos = function clearBuildingPos() {
          this.canBuildingPos = [];
        };
        _proto.building = function building() {
          var posStr = this.canBuildingPos[Math.floor(Math.random() * this.canBuildingPos.length)];
          if (!posStr) return;
          // log("building", posStr, this.canBuildingPos);
          ViewPortFollow.canUpdate.set(0);
          if (!NetComponent.instance.localDebug) {
            GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, true);
            GameNetRequest.building(Number(posStr));
          } else this.buildingLocalReq(posStr);
        };
        _proto.rebuilt = function rebuilt() {
          if (!NetComponent.instance.localDebug) {
            GameNetRequest.rebuilt();
          }
        };
        _proto.traverseBuildings = function traverseBuildings(call) {
          for (var i = 0; i < this.buildingPos.length; i++) {
            for (var j = 0; j < this.buildingPos[i].length; j++) {
              var _pos = this.buildingPos[i][j];
              call(_pos, i, j);
            }
          }
        };
        _proto.localInit = function localInit() {
          this.totalStorey = 3;
          this.buildCount.set(2);
          this.storey = this.totalStorey;
        };
        _proto.getPos = function getPos(posStr) {
          var matrix = Number(posStr[1]);
          var pos = this.buildingPos[matrix][posStr[2]];
          return pos;
        };
        _proto.getBuildingInfo = function getBuildingInfo(storey) {
          //登录成功后请求玩家楼层信息
          var storeys = [];
          for (var i = 0; i < storey; i++) {
            storeys.push(storey - i);
          }
          GameNetRequest.getBuildingInfo(storeys);
        }

        //本地建造模拟
        ;

        _proto.buildingLocalReq = function buildingLocalReq(posStr) {
          this.buildCount.add(1);
          var info = new OPCreateBuildRet();
          var randomInfo = BuildBaseConfig.getInstance().getRandomBuilding(this.storey);
          info.buildId = randomInfo.id;
          info.buildPostion = Number(posStr);
          info.currentBuildCount = this.buildCount.cur;
          info.currentStorey = this.storey;
          info.isStoreyUp = this.buildCount.isMax();
          info.totalBuildCount = this.buildCount.max;
          if (info.isStoreyUp) {
            this.buildCount.set(0);
            info.currentStorey = ++this.storey;
          }
          GlobalEventManager.getInstance().emit(GameEvent.Building, info);
        };
        return BuildingDataManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildingEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './UIConstant.ts', './BuildingDataManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, animation, UITransform, tween, v3, Component, GlobalEventManager, GameEvent, UIEvent, BuildingDataManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      animation = module.animation;
      UITransform = module.UITransform;
      tween = module.tween;
      v3 = module.v3;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "1a933EAuXxDkrlj2oM13q1U", "BuildingEffect", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BuildingEffect = exports('BuildingEffect', (_dec = ccclass('BuildingEffect'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuildingEffect, _Component);
        function BuildingEffect() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "buildingRoot", _descriptor, _assertThisInitialized(_this));
          _this.controller = void 0;
          return _this;
        }
        var _proto = BuildingEffect.prototype;
        _proto.onLoad = function onLoad() {
          this.controller = this.node.getComponent(animation.AnimationController);
          GlobalEventManager.getInstance().on(GameEvent.BuildingEffect, this.onBuildingEffect, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.start = function start() {
          this.node.active = false;
        };
        _proto.onBuildingEffect = function onBuildingEffect(pos) {
          var _this2 = this;
          var effectPos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos);
          this.node.setPosition(effectPos);
          this.node.active ? this.controller.setValue("Replay", 1) : this.node.active = true;
          var buildingRootPos = this.buildingRoot.parent.getComponent(UITransform).convertToNodeSpaceAR(pos);
          buildingRootPos.multiplyScalar(1 / this.buildingRoot.scale.x);
          buildingRootPos.add3f(effectPos.x - this.buildingRoot.position.x / this.buildingRoot.scale.x, effectPos.y - this.buildingRoot.position.y / this.buildingRoot.scale.x, 0);
          var srcScale = this.buildingRoot.scale.clone();
          var srcPos = this.buildingRoot.position.clone();
          var srcSize = this.buildingRoot.getComponent(UITransform).contentSize.clone();
          this.buildingRoot.getComponent(UITransform).setContentSize(srcSize.width * 2, srcSize.height * 2);
          tween(this.buildingRoot).to(0.3, {
            position: v3(-buildingRootPos.x, -buildingRootPos.y),
            scale: v3(2, 2, 2)
          }, {
            easing: "cubicOut"
          }).delay(2).to(0.3, {
            position: srcPos,
            scale: srcScale
          }, {
            easing: "cubicOut"
          }).call(function () {
            _this2.buildingRoot.getComponent(UITransform).setContentSize(srcSize);
            GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
            BuildingDataManager.getInstance().buildingVfx.set(1);
          }).start();
          GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, true);
        };
        return BuildingEffect;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "buildingRoot", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildingFloorHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './GameDataManager.ts', './NetWorkHandler.ts', './GlobalConfig.ts', './SceneManager.ts', './BoardEffectNode.ts', './BuildingDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, director, GlobalEventManager, GameEvent, GameDataManager, NetWorkHandler, DefaultScene, GlobalEvent, SceneManager, BoardEffectNode, BuildingDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }, function (module) {
      DefaultScene = module.DefaultScene;
      GlobalEvent = module.GlobalEvent;
    }, function (module) {
      SceneManager = module.default;
    }, function (module) {
      BoardEffectNode = module.BoardEffectNode;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "be556cz/e5AfIFcKQoRAGXP", "BuildingFloorHandler", undefined);
      var BuildingFloorHandler = exports('BuildingFloorHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(BuildingFloorHandler, _NetWorkHandler);
        function BuildingFloorHandler(proto, code) {
          var _this;
          _this = _NetWorkHandler.call(this, proto, code) || this;
          _this.data = void 0;
          BoardEffectNode.vfxState.stateChangeHandler.add(function (state, _, isAdd) {
            if (state == 2 && !isAdd) {
              GameDataManager.getInstance().invasion.set(1);
              GlobalEventManager.getInstance().emit(GameEvent.InitBuildings, _this.data.buildStoreys, false, _this.data.targetId);
            }
          });
          return _this;
        }
        var _proto = BuildingFloorHandler.prototype;
        _proto.onHandler = function onHandler() {
          // console.log("BuildingFloorHandler!!", this.data);
          if (this.data.targetId != GameDataManager.getInstance().data.playerId.cur) {
            if (BoardEffectNode.vfxState.isState(0)) {
              GameDataManager.getInstance().invasion.set(1);
              GlobalEventManager.getInstance().emit(GameEvent.InitBuildings, this.data.buildStoreys, false, this.data.targetId);
            }
          } else {
            var _director$getScene;
            if (((_director$getScene = director.getScene()) == null ? void 0 : _director$getScene.name) == DefaultScene.Lobby) {
              this.needRebuilt();
              GlobalEventManager.getInstance().emit(GameEvent.InitBuildings, this.data.buildStoreys, false, this.data.targetId);
            } else {
              SceneManager.getInstance().loadedHandler.remove(this.onSceneLoadListener.bind(this));
              SceneManager.getInstance().loadedHandler.add(this.onSceneLoadListener.bind(this));
            }
            GlobalEventManager.getInstance().emit(GlobalEvent.Preloaded);
          }
        };
        _proto.onSceneLoadListener = function onSceneLoadListener(scene) {
          if ((scene == null ? void 0 : scene.name) == DefaultScene.Lobby && this.data.targetId == GameDataManager.getInstance().data.playerId.cur) {
            this.needRebuilt();
            GlobalEventManager.getInstance().emit(GameEvent.InitBuildings, this.data.buildStoreys, true, this.data.targetId);
          }
        };
        _proto.needRebuilt = function needRebuilt() {
          if (this.data.buildStoreys.length == 0) return;
          var info = this.data.buildStoreys[0];
          if (info.rebuildPostions && info.rebuildPostions.length > 0) {
            BuildingDataManager.getInstance().needRebuilt.set(1);
            BuildingDataManager.getInstance().rebuiltGold.set(info.goldCoin);
          }
        };
        return BuildingFloorHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildingHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './BuildingDataManager.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GlobalEventManager, GameEvent, BuildingDataManager, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "30c0clKm5ZLl7EuapcHrqbd", "BuildingHandler", undefined);
      var BuildingHandler = exports('BuildingHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(BuildingHandler, _NetWorkHandler);
        function BuildingHandler(proto, code) {
          var _this;
          _this = _NetWorkHandler.call(this, proto, code) || this;
          _this.data = void 0;
          BuildingDataManager.getInstance().buildingVfx.addChangeListener(function (cur) {
            if (cur) {
              if (_this.data.isStoreyUp) BuildingDataManager.getInstance().getBuildingInfo(_this.data.currentStorey);
              BuildingDataManager.getInstance().buildingVfx.cur = 0;
            }
          });
          return _this;
        }
        var _proto = BuildingHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("BuildingHandler!!", this.data);
          BuildingDataManager.getInstance().buildCount.set(this.data.currentBuildCount);
          GlobalEventManager.getInstance().emit(GameEvent.Building, this.data);
        };
        return BuildingHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildingItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResLoader.ts', './BuildingMap.ts', './BuildBaseConfig.ts', './GlobalEventManager.ts', './Constants.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, view, UITransform, Node, TiledMap, Component, ResLoader, ResType, BuildingMap, BuildBaseConfig, GlobalEventManager, GameEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      UITransform = module.UITransform;
      Node = module.Node;
      TiledMap = module.TiledMap;
      Component = module.Component;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }, function (module) {
      BuildingMap = module.BuildingMap;
    }, function (module) {
      BuildBaseConfig = module.BuildBaseConfig;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "54f25DUcEdOVZhfms/A3LgF", "BuildingItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BuildingItem = exports('BuildingItem', (_dec = ccclass('BuildingItem'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuildingItem, _Component);
        function BuildingItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.storey = 0;
          _this.delta = 0;
          _this.maxY = 0;
          _this.minY = 0;
          _this.info = void 0;
          _this.inLoading = false;
          _this.buildingNode = void 0;
          _this.style = 0;
          _this.level = 0;
          return _this;
        }
        var _proto = BuildingItem.prototype;
        _proto.onLoad = function onLoad() {
          this.maxY = view.getVisibleSize().height + this.node.getComponent(UITransform).contentSize.height;
          this.minY = -this.node.getComponent(UITransform).contentSize.height;
        };
        _proto.update = function update(dt) {
          if (this.storey == 0) return;
          this.delta += dt;
          if (this.delta > BuildingItem.updateInterval) {
            this.delta = 0;
            if (this.level == 1 && this.node.worldPosition.y < view.getVisibleSize().height * 0.8 && this.node.worldPosition.y > 0 && this.buildingNode) {
              GlobalEventManager.getInstance().emit(GameEvent.UpdateBg, this.style);
            } else if (this.level == 5 && this.node.worldPosition.y < view.getVisibleSize().height && this.node.worldPosition.y > view.getVisibleSize().height * 0.8 && this.buildingNode) {
              GlobalEventManager.getInstance().emit(GameEvent.UpdateBg, this.style);
            }
            // log(this.node.worldPosition.y, this.minY, this.storey);
            if (BuildingItem.enableClip) {
              if (this.node.worldPosition.y > this.maxY || this.node.worldPosition.y < this.minY) {
                if (this.buildingNode) {
                  this.buildingNode.destroy();
                  this.buildingNode = null;
                  // log("回收屏幕外的节点!!", this.storey);
                }
              } else {
                if (!this.buildingNode) {
                  this.init(this.info);
                  // log("加载屏幕内的节点!!", this.storey);
                }
              }
            }
          }
        };

        _proto.init = function init(storeyInfo) {
          var _this2 = this;
          if (this.inLoading) return;
          this.inLoading = true;
          this.info = storeyInfo;
          this.storey = storeyInfo.currentStorey;
          var datas = BuildBaseConfig.getInstance().getStoreyBuildings(this.storey);
          var level = datas[0].storey.split("_").indexOf(this.storey.toString()) + 1;
          this.level = level;
          this.style = datas[0].style;
          ResLoader.instance.load("L" + this.style + "_level_" + level, ResType.TileMap, function (d) {
            var model = new Node("map_" + storeyInfo.currentStorey);
            var map = model.addComponent(TiledMap);
            map.tmxAsset = d;
            model.parent = _this2.node;
            model.getComponent(UITransform).setAnchorPoint(0.5, 1);
            model.setPosition(64, 0);
            _this2.buildingNode = model;
            _this2.inLoading = false;
            model.addComponent(BuildingMap).init(_this2.storey, storeyInfo.storeyInfos);
          });
        };
        return BuildingItem;
      }(Component), _class2.updateInterval = 0.5, _class2.enableClip = true, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildingMap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './BuildingDataManager.ts', './BuildBaseConfig.ts', './GameDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, UITransform, TiledMap, v3, Component, GlobalEventManager, GameEvent, BuildingDataManager, BuildBaseConfig, GameDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      TiledMap = module.TiledMap;
      v3 = module.v3;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }, function (module) {
      BuildBaseConfig = module.BuildBaseConfig;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "09b95z7TTxJsq68lYVMrrXt", "BuildingMap", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BuildingMap = exports('BuildingMap', (_dec = ccclass('BuildingMap'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuildingMap, _Component);
        function BuildingMap() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.tilemap = void 0;
          return _this;
        }
        var _proto = BuildingMap.prototype;
        _proto.build = function build(id, x, y, outline) {
          var layer = this.tilemap.getLayer(outline == 1 ? "building" : "building_outline");
          var pos = this.getTilePos(layer.getPositionAt(x, y));
          var worldPos = this.tilemap.getComponent(UITransform).convertToWorldSpaceAR(pos);
          GlobalEventManager.getInstance().emit(GameEvent.BuildingEffect, worldPos);
          setTimeout(function () {
            layer.setTileGIDAt(id, x, y);
            layer.markForUpdateRenderData(true);
          }, 1200);
        };
        _proto.init = function init(storey, infos) {
          this.tilemap = this.node.getComponent(TiledMap);
          this.tilemap.enableCulling = false;
          var layer = this.tilemap.getLayer("building");
          var layerOutline = this.tilemap.getLayer("building_outline");
          var isCurrentStorey = storey == BuildingDataManager.getInstance().storey;
          if (!GameDataManager.getInstance().invasion) if (isCurrentStorey) BuildingDataManager.getInstance().clearBuildingPos();else isCurrentStorey = false;
          BuildingDataManager.getInstance().traverseBuildings(function (pos, matrix, index) {
            var gid = layer.getTileGIDAt(pos.x, pos.y);
            var gidOutline = layerOutline.getTileGIDAt(pos.x, pos.y);
            var info = infos == null ? void 0 : infos.find(function (t) {
              return t.postion.toString()[1] == matrix.toString() && t.postion.toString()[2] == index.toString();
            });
            if (info) {
              var isOutline = info.postion.toString()[0] == "2";
              var cfg = BuildBaseConfig.getInstance().getDataById(info.buildId);
              var buildId = Number(cfg.path);
              isOutline ? layerOutline.setTileGIDAt(buildId, pos.x, pos.y) : layer.setTileGIDAt(buildId, pos.x, pos.y);
              if (!cfg.isMax && isCurrentStorey) {
                // log("init", cfg, info.postion);
                BuildingDataManager.getInstance().addValidBuildingPos(info.postion.toString());
              }
            } else {
              if (isCurrentStorey) {
                if (gid > 0) BuildingDataManager.getInstance().addValidBuildingPos("1" + matrix + index);else if (gidOutline > 0) BuildingDataManager.getInstance().addValidBuildingPos("2" + matrix + index);
              }
              layer.setTileGIDAt(0, pos.x, pos.y);
              layerOutline.setTileGIDAt(0, pos.x, pos.y);
            }
          });
          // log("init", BuildingDataManager.getInstance().canBuildingPos);
          layer.markForUpdateRenderData(true);
        };
        _proto.getTilePos = function getTilePos(pos) {
          var mapSize = this.tilemap.node.getComponent(UITransform).contentSize;
          var tileSize = this.tilemap.getTileSize();
          var x = pos.x - mapSize.width * 0.5 + tileSize.width * 0.5;
          var y = pos.y - mapSize.height + tileSize.height * 0.5;
          return v3(x, y);
        };
        return BuildingMap;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildingRoot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuildingMap.ts', './BuildingDataManager.ts', './GlobalEventManager.ts', './Constants.ts', './NetComponent.ts', './BuildingItem.ts', './UIConstant.ts', './BuildBaseConfig.ts', './ViewPortFollow.ts', './RollLogic.ts', './GameDataManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, ScrollView, UITransform, instantiate, Component, BuildingMap, BuildingDataManager, GlobalEventManager, GameEvent, RollState, NetComponent, BuildingItem, UIEvent, BuildBaseConfig, ViewPortFollow, RollLogic, GameDataManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      ScrollView = module.ScrollView;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      BuildingMap = module.BuildingMap;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
      RollState = module.RollState;
    }, function (module) {
      NetComponent = module.NetComponent;
    }, function (module) {
      BuildingItem = module.BuildingItem;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      BuildBaseConfig = module.BuildBaseConfig;
    }, function (module) {
      ViewPortFollow = module.ViewPortFollow;
    }, function (module) {
      RollLogic = module.RollLogic;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "cea0fSlNtROjLFIwW04GAA1", "BuildingRoot", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BuildingRoot = exports('BuildingRoot', (_dec = ccclass('BuildingRoot'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuildingRoot, _Component);
        function BuildingRoot() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "itemModel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "board", _descriptor2, _assertThisInitialized(_this));
          _this.totalLayers = [];
          _this.scrollView = void 0;
          return _this;
        }
        var _proto = BuildingRoot.prototype;
        _proto.onLoad = function onLoad() {
          this.scrollView = this.getComponent(ScrollView);
          this.scrollView.node.on(Node.EventType.TOUCH_START, function (event) {
            ViewPortFollow.canUpdate.set(0);
          });
          if (NetComponent.instance.localDebug) this.initTowerLayersLocal();
          GlobalEventManager.getInstance().on(GameEvent.InitBuildings, this.onInitBuildings, this);
          GlobalEventManager.getInstance().on(GameEvent.NewFloor, this.onNewFloor, this);
          GlobalEventManager.getInstance().on(GameEvent.Building, this.onBuilding, this);
          RollLogic.getInstance().rollState.stateChangeHandler.add(this.onRollListener.bind(this));
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
          RollLogic.getInstance().rollState.stateChangeHandler.remove(this.onRollListener.bind(this));
        };
        _proto.update = function update(deltaTime) {};
        _proto.onRollListener = function onRollListener(state, _, isAdd) {
          if (state == RollState.Rolling && isAdd) {
            this.scrollView.stopAutoScroll();
          }
        };
        _proto.onBuilding = function onBuilding(info) {
          this.scrollView.stopAutoScroll();
          var outline = Number(info.buildPostion.toString()[0]);
          var pos = BuildingDataManager.getInstance().getPos(info.buildPostion.toString());
          var map = this.totalLayers[0].getComponentInChildren(BuildingMap);
          var cfg = BuildBaseConfig.getInstance().getDataById(info.buildId);
          var buildId = Number(cfg.path);
          // log("onBuilding", cfg, pos, info.buildPostion);
          if (cfg.isMax) {
            BuildingDataManager.getInstance().deleteValidBuildingPos(info.buildPostion.toString());
          }
          // log("onBuilding", BuildingDataManager.getInstance().canBuildingPos);
          map.build(buildId, pos.x, pos.y, outline);
        };
        _proto.onInitBuildings = function onInitBuildings(storeyInfos, firstLoading, playerId) {
          var _this2 = this;
          if (firstLoading === void 0) {
            firstLoading = false;
          }
          if (playerId != GameDataManager.getInstance().data.playerId.cur) return;
          this.initTowerByInfo(storeyInfos);
          var totalLen = -this.totalLayers[this.totalLayers.length - 1].getComponent(UITransform).getBoundingBox().yMin + 200;
          var contentTrans = this.scrollView.content.getComponent(UITransform);
          contentTrans.setContentSize(contentTrans.contentSize.width, totalLen);
          GlobalEventManager.getInstance().emit(UIEvent.UpdateBuildingListContentSize, totalLen);
          if (firstLoading && this.totalLayers.length > 2) {
            GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, true);
            BuildingItem.enableClip = false;
            this.scrollView.scrollToBottom(0);
            var duration = 4 + (this.totalLayers.length / 5 - 1);
            setTimeout(function () {
              return _this2.scrollView.scrollToTop(duration);
            }, 500);
            setTimeout(function () {
              ViewPortFollow.canUpdate.set(1);
              BuildingItem.enableClip = true;
              GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
            }, duration * 0.7 * 1000);
          } else {
            BuildingItem.enableClip = true;
            ViewPortFollow.canUpdate.set(1);
          }
        };
        _proto.initTowerByInfo = function initTowerByInfo(storeyInfos) {
          this.totalLayers.forEach(function (t) {
            t.removeFromParent();
            t.destroy();
          });
          this.totalLayers = [];
          var startY = this.board.position.y + 60;
          var space = 760;
          if (storeyInfos.length == 0) {
            var node = instantiate(this.itemModel);
            node.parent = this.scrollView.content;
            node.setPosition(0, startY);
            var storeyInfo = new OPBuildStoreyInfo();
            storeyInfo.currentStorey = 1;
            node.getComponent(BuildingItem).init(storeyInfo);
            this.totalLayers.push(node);
          } else {
            for (var i = 0; i < storeyInfos.length; i++) {
              var info = storeyInfos[i];
              var _node = instantiate(this.itemModel);
              _node.parent = this.scrollView.content;
              _node.setSiblingIndex(0);
              _node.setPosition(0, startY - i * space);
              _node.getComponent(BuildingItem).init(info);
              this.totalLayers.push(_node);
            }
          }
        };
        _proto.initTowerLayersLocal = function initTowerLayersLocal() {
          BuildingDataManager.getInstance().localInit();
          var infos = [];
          var len = BuildingDataManager.getInstance().totalStorey;
          for (var i = 0; i < len; i++) {
            var info = new OPBuildStoreyInfo();
            info.currentStorey = len - i;
            // if (i == 0) info.storeyInfos = [new OPStoreyInfo({postion: 210, buildId: 1}), new OPStoreyInfo({postion: 121, buildId: 9})];
            infos.push(info);
          }
          this.onInitBuildings(infos, true, GameDataManager.getInstance().data.playerId.cur);
        };
        _proto.onNewFloor = function onNewFloor(currentStorey) {};
        return BuildingRoot;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemModel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "board", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonAddDice.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './ClickComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, GameDataManager, ClickComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      ClickComponent = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "cbe3bNRx6FEs4O15Sl0RArD", "ButtonAddDice", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ButtonAddDice = exports('ButtonAddDice', (_dec = ccclass('ButtonAddDice'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ButtonAddDice, _ClickComponent);
        function ButtonAddDice() {
          return _ClickComponent.apply(this, arguments) || this;
        }
        var _proto = ButtonAddDice.prototype;
        _proto.onClick = function onClick() {
          GameDataManager.getInstance().data.dice.add(10);
        };
        return ButtonAddDice;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonBuild.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './BuildingDataManager.ts', './BuildGoldConfig.ts', './GameDataManager.ts', './GlobalConfig.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, ClickComponent, BuildingDataManager, BuildGoldConfig, GameDataManager, GlobalConstant;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }, function (module) {
      BuildGoldConfig = module.BuildGoldConfig;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      GlobalConstant = module.GlobalConstant;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "d6c66hjjExCCqz239NNc7bZ", "ButtonBuild", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ButtonBuild = exports('ButtonBuild', (_dec = ccclass('ButtonBuild'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ButtonBuild, _ClickComponent);
        function ButtonBuild() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ClickComponent.call.apply(_ClickComponent, [this].concat(args)) || this;
          _this.inBuilding = false;
          _this.labelBuildings = void 0;
          return _this;
        }
        var _proto = ButtonBuild.prototype;
        _proto.start = function start() {
          this.labelBuildings = this.node.getComponentInChildren(Label);
          BuildingDataManager.getInstance().buildCount.addChangeListener(this.onBuildingProgressUpdate, this);
          this.onBuildingProgressUpdate();
        };
        _proto.onDestroy = function onDestroy() {
          BuildingDataManager.getInstance().buildCount.removeChangeListener(this.onBuildingProgressUpdate, this);
        };
        _proto.onClick = function onClick(event, param) {
          if (BuildingDataManager.getInstance().needRebuilt.cur && BuildingDataManager.getInstance().rebuiltGold.cur) {
            if (GameDataManager.getInstance().data.gold.cur < BuildingDataManager.getInstance().rebuiltGold.cur) {
              GlobalConstant.showFloatingTip("gold not enough!");
              return;
            }
            GameDataManager.getInstance().data.gold.add(-BuildingDataManager.getInstance().rebuiltGold.cur);
            BuildingDataManager.getInstance().rebuilt();
          } else {
            var price = BuildGoldConfig.getInstance().getPrice(BuildingDataManager.getInstance().buildCount.cur + 1, BuildingDataManager.getInstance().storey);
            if (GameDataManager.getInstance().data.gold.cur < price) {
              GlobalConstant.showFloatingTip("gold not enough!");
              return;
            }
            GameDataManager.getInstance().data.gold.add(-price);
            BuildingDataManager.getInstance().building();
          }
        };
        _proto.onBuildingProgressUpdate = function onBuildingProgressUpdate() {
          this.labelBuildings.string = BuildingDataManager.getInstance().buildCount.cur + "/" + BuildingDataManager.getInstance().buildCount.max;
        };
        return ButtonBuild;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonDrawCard.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './GameNetRequest.ts', './CardsDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ClickComponent, GameNetRequest, CardsDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }, function (module) {
      CardsDataManager = module.CardsDataManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "6c8eeHs0uxGBKxL3bfPPbt5", "ButtonDrawCard", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ButtonDrawCard = exports('ButtonDrawCard', (_dec = ccclass('ButtonDrawCard'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ButtonDrawCard, _ClickComponent);
        function ButtonDrawCard() {
          return _ClickComponent.apply(this, arguments) || this;
        }
        var _proto = ButtonDrawCard.prototype;
        _proto.onClick = function onClick(event, param) {
          if (CardsDataManager.getInstance().drawState.isState(1)) return;
          CardsDataManager.getInstance().drawState.setState(1);
          GameNetRequest.drawCard();
        };
        return ButtonDrawCard;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonInvasionCollect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './ClickComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, GameDataManager, ClickComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      ClickComponent = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ba0f9PWwf5K17OATOLQJMuD", "ButtonInvasionCollect", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ButtonInvasionCollect = exports('ButtonInvasionCollect', (_dec = ccclass('ButtonInvasionCollect'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ButtonInvasionCollect, _ClickComponent);
        function ButtonInvasionCollect() {
          return _ClickComponent.apply(this, arguments) || this;
        }
        var _proto = ButtonInvasionCollect.prototype;
        _proto.onClick = function onClick() {
          GameDataManager.getInstance().invasion.set(0);
          GameDataManager.getInstance().data.gold.add(GameDataManager.getInstance().invasionGold.cur);
        };
        return ButtonInvasionCollect;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonMulti.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './GameLocalData.ts', './SpriteFrameComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Button, ClickComponent, GameLocalData, SpriteFrameComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      GameLocalData = module.default;
    }, function (module) {
      SpriteFrameComponent = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "8ecbcUXvk5KMJFckvCAFcnr", "ButtonMulti", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ButtonMulti = exports('ButtonMulti', (_dec = ccclass('ButtonMulti'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ButtonMulti, _ClickComponent);
        function ButtonMulti() {
          return _ClickComponent.apply(this, arguments) || this;
        }
        var _proto = ButtonMulti.prototype;
        _proto.onLoad = function onLoad() {
          _ClickComponent.prototype.onLoad.call(this);
          this.onMultiChange();
          GameLocalData.instance.data.multi.addChangeListener(this.onMultiChange, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameLocalData.instance.data.multi.removeChangeListener(this.onMultiChange, this);
        };
        _proto.onClick = function onClick(event, param) {
          GameLocalData.instance.nextMulti();
        };
        _proto.onMultiChange = function onMultiChange() {
          var index = GameLocalData.instance.getIndex();
          this.node.getComponentInChildren(SpriteFrameComponent).setFrameByIndex(index);
          var button = this.node.getComponent(Button);
          var frames = this.node.getComponent(SpriteFrameComponent).frames;
          if (index >= 0 && index <= 2) {
            button.normalSprite = frames[0];
            button.hoverSprite = frames[0];
            button.disabledSprite = frames[0];
            button.pressedSprite = frames[1];
          } else if (index >= 3 && index <= 5) {
            button.normalSprite = frames[2];
            button.hoverSprite = frames[2];
            button.disabledSprite = frames[2];
            button.pressedSprite = frames[3];
          } else {
            button.normalSprite = frames[4];
            button.hoverSprite = frames[4];
            button.disabledSprite = frames[4];
            button.pressedSprite = frames[5];
          }
        };
        return ButtonMulti;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonRepair.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './GameNetRequest.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ClickComponent, GameNetRequest;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "faebemuRrpN1Y9TVZdTAZZW", "ButtonRepair", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ButtonRepair = exports('ButtonRepair', (_dec = ccclass('ButtonRepair'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ButtonRepair, _ClickComponent);
        function ButtonRepair() {
          return _ClickComponent.apply(this, arguments) || this;
        }
        var _proto = ButtonRepair.prototype;
        _proto.onClick = function onClick(event, param) {
          GameNetRequest.rebuilt();
        };
        return ButtonRepair;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonRoll.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Constants.ts', './RollLogic.ts', './ClickComponent.ts', './GameDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, Button, RollState, RollLogic, ClickComponent, GameDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Button = module.Button;
    }, function (module) {
      RollState = module.RollState;
    }, function (module) {
      RollLogic = module.RollLogic;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a03adzW3sdGaYPelxNul+Q1", "ButtonRoll", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ButtonRoll = exports('ButtonRoll', (_dec = ccclass('ButtonRoll'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ButtonRoll, _ClickComponent);
        function ButtonRoll() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ClickComponent.call.apply(_ClickComponent, [this].concat(args)) || this;
          _this.longPressTimer = 0;
          return _this;
        }
        var _proto = ButtonRoll.prototype;
        _proto.start = function start() {
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          RollLogic.getInstance().rollState.stateChangeHandler.add(this.onRollStateChange.bind(this));
        };
        _proto.onDestroy = function onDestroy() {
          RollLogic.getInstance().rollState.stateChangeHandler.remove(this.onRollStateChange.bind(this));
        };
        _proto.onClick = function onClick(event, param) {
          if (!RollLogic.getInstance().rollState.isState(RollState.Idle)) return;
          clearTimeout(this.longPressTimer);
          RollLogic.getInstance().roll();
        };
        _proto.onTouchStart = function onTouchStart() {
          if (!RollLogic.getInstance().rollState.isState(RollState.Idle)) return;
          if (GameDataManager.getInstance().data.dice.isLow()) return;
          clearTimeout(this.longPressTimer);
          this.longPressTimer = setTimeout(function () {
            RollLogic.getInstance().continuousRoll();
          }, 500);
        };
        _proto.onRollStateChange = function onRollStateChange() {
          if (!RollLogic.getInstance().rollState.isState(RollState.Idle)) {
            this.enableButton(false);
            return;
          }
          if (GameDataManager.getInstance().data.dice.isLow()) {
            RollLogic.getInstance().inContinuous.set(0);
          }
          if (RollLogic.getInstance().inContinuous.cur) RollLogic.getInstance().roll();else this.enableButton(true);
        };
        _proto.enableButton = function enableButton(enable) {
          enable ? this.node.resumeSystemEvents(false) : this.node.pauseSystemEvents(false);
          this.node.getComponent(Button).interactable = enable;
        };
        return ButtonRoll;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonRollContinuous.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './RollLogic.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ClickComponent, RollLogic;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      RollLogic = module.RollLogic;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "41b93MF2fxPfraCUGgPjUeq", "ButtonRollContinuous", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ButtonRollContinuous = exports('ButtonRollContinuous', (_dec = ccclass('ButtonRollContinuous'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ButtonRollContinuous, _ClickComponent);
        function ButtonRollContinuous() {
          return _ClickComponent.apply(this, arguments) || this;
        }
        var _proto = ButtonRollContinuous.prototype;
        _proto.start = function start() {
          this.node.active = false;
          RollLogic.getInstance().inContinuous.addChangeListener(this.onContinueChange, this);
        };
        _proto.onDestroy = function onDestroy() {
          RollLogic.getInstance().inContinuous.removeChangeListener(this.onContinueChange, this);
        };
        _proto.onClick = function onClick(event, param) {
          RollLogic.getInstance().stopContinuousRoll();
        };
        _proto.onContinueChange = function onContinueChange(cur) {
          this.node.active = cur ? true : false;
        };
        return ButtonRollContinuous;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CacheRewardsCenter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './UIConstant.ts', './Constants.ts', './GameDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, GlobalEventManager, UIEvent, AssetCode, GameDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      AssetCode = module.AssetCode;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _class2;
      cclegacy._RF.push({}, "923e4VOU3dJsYK9CH5JOy1C", "CacheRewardsCenter", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CacheData = function CacheData() {
        this.type = void 0;
        this.value = void 0;
        this.isAdd = true;
      };
      var CacheRewardsCenter = exports('CacheRewardsCenter', (_dec = ccclass('CacheRewardsCenter'), _dec(_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CacheRewardsCenter, _Component);
        function CacheRewardsCenter() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.cache = [];
          return _this;
        }
        var _proto = CacheRewardsCenter.prototype;
        _proto.start = function start() {
          GlobalEventManager.getInstance().on(UIEvent.CacheReward, this.onCacheReward, this);
          GlobalEventManager.getInstance().on(UIEvent.SyncCachedReward, this.onSyncCachedReward, this);
          GlobalEventManager.getInstance().on(UIEvent.ClearCacheReward, this.onClearCacheReward, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.update = function update(deltaTime) {};
        _proto.onCacheReward = function onCacheReward(rewardType, value, isAdd) {
          if (isAdd === void 0) {
            isAdd = true;
          }
          var data = new CacheData();
          data.type = rewardType;
          data.isAdd = isAdd;
          data.value = value;
          this.cache.push(data);
        };
        _proto.onSyncCachedReward = function onSyncCachedReward(fromScene) {
          while (this.cache.length > 0) {
            var data = this.cache.shift();
            switch (data.type) {
              case AssetCode.Soul:
                if (data.isAdd) GameDataManager.getInstance().data.soul.add(data.value);else GameDataManager.getInstance().data.soul.set(data.value);
                break;
              case AssetCode.Gold:
                if (data.isAdd) GameDataManager.getInstance().data.gold.add(data.value);else GameDataManager.getInstance().data.gold.set(data.value);
                break;
              case AssetCode.Shield:
                if (data.isAdd) GameDataManager.getInstance().data.shield.add(data.value);else GameDataManager.getInstance().data.shield.set(data.value);
                break;
              case AssetCode.Dice:
                if (data.isAdd) GameDataManager.getInstance().data.dice.add(data.value);else GameDataManager.getInstance().data.dice.set(data.value);
                break;
            }
          }
        };
        _proto.onClearCacheReward = function onClearCacheReward() {
          this.cache = [];
        };
        return CacheRewardsCenter;
      }(Component)) || _class2));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardBaseConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResPreLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, ResPreLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResPreLoader = module.ResPreLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e7275ktYLJJI5MU+OJv2s44", "CardBaseConfig", undefined);
      var CardBaseConfigData = exports('CardBaseConfigData', function CardBaseConfigData() {
        this.id = void 0;
        this.name = void 0;
        this.path = void 0;
        this.info = void 0;
      });
      var CardBaseConfig = exports('CardBaseConfig', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(CardBaseConfig, _Singleton);
        function CardBaseConfig() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = void 0;
          _this.data = ResPreLoader.instance.getConfig("CardBaseJson").json;
          return _this;
        }
        var _proto = CardBaseConfig.prototype;
        _proto.getDataById = function getDataById(id) {
          return this.data.find(function (item) {
            return item.id == id;
          });
        };
        return CardBaseConfig;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Sprite, Component, ResLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      ResLoader = module.ResLoader;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "296adZynv9PkrTM7WRdGUIR", "CardItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CardItem = exports('CardItem', (_dec = ccclass('CardItem'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CardItem, _Component);
        function CardItem() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = CardItem.prototype;
        _proto.init = function init(level, iconId) {
          var stars = this.node.getChildByName("stars");
          var frameNFT = this.node.getChildByName("NFTFrame");
          var spCard = this.node.getComponent(Sprite);
          spCard.grayscale = level == 0;
          stars.children.forEach(function (star, index) {
            return star.active = index < level && level != 4;
          });
          frameNFT.active = level == 4;
          ResLoader.instance.loadSpriteFrame(spCard, "icon_card_" + iconId[Math.max(0, level - 1)]);
        };
        return CardItem;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardLevelConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResPreLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, ResPreLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResPreLoader = module.ResPreLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "606bb/urVFH4bNGDtjkSEWH", "CardLevelConfig", undefined);
      var CardLevelConfigData = exports('CardLevelConfigData', function CardLevelConfigData() {
        this.id = void 0;
        this.cardId = void 0;
        this.level = void 0;
        this.soulCount = void 0;
      });
      var CardLevelConfig = exports('CardLevelConfig', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(CardLevelConfig, _Singleton);
        function CardLevelConfig() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = void 0;
          _this.data = ResPreLoader.instance.getConfig("CardLevelJson").json;
          return _this;
        }
        var _proto = CardLevelConfig.prototype;
        _proto.getDataById = function getDataById(id) {
          return this.data.find(function (item) {
            return item.id == id;
          });
        };
        _proto.getDataByIdAndLevel = function getDataByIdAndLevel(cid, level) {
          return this.data.find(function (t) {
            return t.cardId == cid && t.level == level;
          });
        };
        return CardLevelConfig;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardsDataManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SwitchState.ts', './Singleton.ts'], function (exports) {
  var _inheritsLoose, cclegacy, SwitchState, Singleton;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      SwitchState = module.SwitchState;
    }, function (module) {
      Singleton = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5da2f+oq9JJtJnCNspFjjAN", "CardsDataManager", undefined);
      var CardsDataManager = exports('CardsDataManager', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(CardsDataManager, _Singleton);
        function CardsDataManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this.cardsSuitInfo = [];
          _this.buffs = [];
          _this.newCards = void 0;
          _this.recoveryCards = void 0;
          _this.drawState = new SwitchState();
          return _this;
        }
        return CardsDataManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardsDrawHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardsDataManager.ts', './GameDataManager.ts', './NetWorkHandler.ts', './GameNetRequest.ts'], function (exports) {
  var _inheritsLoose, cclegacy, CardsDataManager, GameDataManager, NetWorkHandler, GameNetRequest;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CardsDataManager = module.CardsDataManager;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1e2a91Gm2hL/7YJHHNFdcmQ", "CardsDrawHandler", undefined);
      var CardsDrawHandler = exports('CardsDrawHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(CardsDrawHandler, _NetWorkHandler);
        function CardsDrawHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = CardsDrawHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("CardsDrawHandler!!", this.data);
          GameDataManager.getInstance().data.soul.add(-this.data.consumeSoul);
          GameDataManager.getInstance().data.soul.add(this.data.recoverySoul);
          CardsDataManager.getInstance().newCards = this.data.newCardIds;
          CardsDataManager.getInstance().recoveryCards = this.data.recoveryCardIds;
          CardsDataManager.getInstance().drawState.setState(0);
          GameNetRequest.getCardsInfo();
        };
        return CardsDrawHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardsDrawingView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CardsDataManager.ts', './CardBaseConfig.ts', './ResLoader.ts', './ClickComponent.ts', './TweenRewardsFly.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, instantiate, UIOpacity, v3, tween, Sprite, CardsDataManager, CardBaseConfig, ResLoader, ClickComponent, TweenRewardsFly;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      UIOpacity = module.UIOpacity;
      v3 = module.v3;
      tween = module.tween;
      Sprite = module.Sprite;
    }, function (module) {
      CardsDataManager = module.CardsDataManager;
    }, function (module) {
      CardBaseConfig = module.CardBaseConfig;
    }, function (module) {
      ResLoader = module.ResLoader;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      TweenRewardsFly = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "a244bNbEYhE2J6kZ+86rwk/", "CardsDrawingView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CardsDrawingView = exports('CardsDrawingView', (_dec = ccclass('CardsDrawingView'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(CardsDrawingView, _ClickComponent);
        function CardsDrawingView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ClickComponent.call.apply(_ClickComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "itemModel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemLayout", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "iconSoul", _descriptor3, _assertThisInitialized(_this));
          _this.canClose = false;
          _this.items = [];
          return _this;
        }
        var _proto = CardsDrawingView.prototype;
        _proto.onLoad = function onLoad() {
          _ClickComponent.prototype.onLoad.call(this);
          this.itemModel.active = false;
          this.iconSoul.active = false;
        };
        _proto.onClick = function onClick(event, param) {
          if (!this.canClose) return;
          this.itemLayout.removeAllChildren();
          this.node.active = false;
          CardsDataManager.getInstance().newCards = null;
          CardsDataManager.getInstance().recoveryCards = null;
          this.canClose = false;
        };
        _proto.init = function init() {
          var _this2 = this;
          var cards = [];
          if (CardsDataManager.getInstance().newCards) cards = cards.concat(CardsDataManager.getInstance().newCards);
          if (CardsDataManager.getInstance().recoveryCards) cards = cards.concat(CardsDataManager.getInstance().recoveryCards);
          cards = cards.sort(function (a, b) {
            return Math.round(Math.random()) ? 1 : -1;
          });
          this.items = [];
          var _loop = function _loop(i) {
            var cardCfg = CardBaseConfig.getInstance().getDataById(cards[i]);
            var item = instantiate(_this2.itemModel);
            item.parent = _this2.itemLayout;
            item.active = true;
            item.addComponent(UIOpacity).opacity = 0;
            item.setScale(v3());
            _this2.items.push(item);
            tween(item).delay(i * 0.05).to(0.2, {
              scale: v3(1, 1, 1)
            }, {
              easing: "backOut"
            }).call(function () {
              if (i == cards.length - 1) {
                _this2.canClose = true;
                _this2.recoveryAnim(cards);
              }
            }).start();
            tween(item.getComponent(UIOpacity)).delay(i * 0.05).to(0.2, {
              opacity: 255
            }).start();
            if (cardCfg) ResLoader.instance.loadSpriteFrame(item.getComponent(Sprite), "icon_card_" + cardCfg.path.split("_")[0]);
          };
          for (var i = 0; i < cards.length; i++) {
            _loop(i);
          }
        };
        _proto.recoveryAnim = function recoveryAnim(cards) {
          var _this3 = this;
          var _loop2 = function _loop2(i) {
            if (CardsDataManager.getInstance().recoveryCards.indexOf(cards[i]) < 0) return 1; // continue
            var item = _this3.items[i];
            item.removeFromParent();
            var iconSoul = instantiate(_this3.iconSoul);
            iconSoul.parent = _this3.node;
            iconSoul.setPosition(item.position);
            iconSoul.getComponent(TweenRewardsFly).action(function () {
              if (i == cards.length - 1) _this3.node.active = false;
            });
          };
          for (var i = 0; i < cards.length; i++) {
            if (_loop2(i)) continue;
          }
        };
        return CardsDrawingView;
      }(ClickComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemModel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemLayout", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "iconSoul", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardsInfoHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './CardsDataManager.ts', './UIConstant.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GlobalEventManager, GameEvent, CardsDataManager, UIEvent, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      CardsDataManager = module.CardsDataManager;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "44e0cFD6IdE6pDejkZeZoPE", "CardsInfoHandler", undefined);
      var CardsInfoHandler = exports('CardsInfoHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(CardsInfoHandler, _NetWorkHandler);
        function CardsInfoHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = CardsInfoHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("CardsInfoHandler!!", this.data);
          CardsDataManager.getInstance().cardsSuitInfo = this.data.suits;
          CardsDataManager.getInstance().buffs = this.data.buffs;
          GlobalEventManager.getInstance().emit(UIEvent.RefreshCardsView);
          GlobalEventManager.getInstance().emit(GameEvent.BuffRefresh, this.data.buffs);
        };
        return CardsInfoHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardsMintView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ViewComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "66b22rAKbhG+JkFeECT3siq", "CardsMintView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CardsMintView = exports('CardsMintView', (_dec = ccclass('CardsMintView'), _dec(_class = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(CardsMintView, _ViewComponent);
        function CardsMintView() {
          return _ViewComponent.apply(this, arguments) || this;
        }
        var _proto = CardsMintView.prototype;
        _proto.start = function start() {};
        return CardsMintView;
      }(ViewComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardSuitConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResPreLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, ResPreLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResPreLoader = module.ResPreLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "78b50clSexOn72oRno2tkaD", "CardSuitConfig", undefined);
      var CardSuitConfigData = exports('CardSuitConfigData', function CardSuitConfigData() {
        this.id = void 0;
        this.name = void 0;
        this.path = void 0;
        this.info = void 0;
        this.buffInfo = void 0;
      });
      var CardSuitConfig = exports('CardSuitConfig', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(CardSuitConfig, _Singleton);
        function CardSuitConfig() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = void 0;
          _this.data = ResPreLoader.instance.getConfig("CardSuitJson").json;
          return _this;
        }
        var _proto = CardSuitConfig.prototype;
        _proto.getDataById = function getDataById(id) {
          return this.data.find(function (item) {
            return item.id == id;
          });
        };
        return CardSuitConfig;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardsUpgradeView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts', './GameNetRequest.ts', './CardItem.ts', './MutexActiveComponent.ts', './CardLevelConfig.ts', './GameDataManager.ts', './GlobalConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, log, ViewComponent, GameNetRequest, CardItem, MutexActiveComponent, CardLevelConfig, GameDataManager, GlobalConstant;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      log = module.log;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }, function (module) {
      CardItem = module.CardItem;
    }, function (module) {
      MutexActiveComponent = module.default;
    }, function (module) {
      CardLevelConfig = module.CardLevelConfig;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      GlobalConstant = module.GlobalConstant;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "a52754PAeJDmpOKNt3CZo6V", "CardsUpgradeView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CardsUpgradeView = exports('CardsUpgradeView', (_dec = ccclass('CardsUpgradeView'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(CardsUpgradeView, _ViewComponent);
        function CardsUpgradeView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ViewComponent.call.apply(_ViewComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labelPrice", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "layerPrice", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelName", _descriptor3, _assertThisInitialized(_this));
          _this.config = void 0;
          _this.data = void 0;
          _this.buttonMutex = void 0;
          _this.levelData = void 0;
          return _this;
        }
        var _proto = CardsUpgradeView.prototype;
        _proto.start = function start() {
          this.config = this.params.config;
          this.data = this.params.data;
          this.buttonMutex = this.node.getComponent(MutexActiveComponent);
          this.node.getComponentInChildren(CardItem).init(this.data.level, this.config.path.split("_"));
          this.labelName.string = this.config.name;
          this.layerPrice.active = this.data.level < 4;
          if (this.data.level < 4) {
            this.buttonMutex.setStatus(0);
            log("upgrade", this.config.id, this.data.level);
            this.levelData = CardLevelConfig.getInstance().getDataByIdAndLevel(this.config.id, this.data.level + 1);
            this.labelPrice.string = this.levelData.soulCount.toString();
          } else {
            //TODO 判断钱包是否连接
            this.buttonMutex.setStatus(2);
          }
        };
        _proto.onClickUpgrade = function onClickUpgrade() {
          if (!this.levelData) {
            console.log("no level data");
            return;
          }
          if (GameDataManager.getInstance().data.soul.cur < this.levelData.soulCount) {
            GlobalConstant.showFloatingTip("soul not enough!");
            return;
          }
          GameDataManager.getInstance().data.soul.add(-this.levelData.soulCount);
          GameNetRequest.cardUpgrade(this.data.dbId);
          this.close();
        };
        _proto.onClickMint = function onClickMint() {};
        _proto.onClickConnectWallet = function onClickConnectWallet() {};
        return CardsUpgradeView;
      }(ViewComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelPrice", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "layerPrice", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labelName", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardsView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts', './CardsDataManager.ts', './CardSuitConfig.ts', './ResLoader.ts', './BuffBaseConfig.ts', './ViewCenter.ts', './CardBaseConfig.ts', './SpriteFrameComponent.ts', './GlobalEventManager.ts', './UIConstant.ts', './GameNetRequest.ts', './CardItem.ts', './CardsDrawingView.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Label, PageView, Node, instantiate, Sprite, RichText, v3, ViewComponent, CardsDataManager, CardSuitConfig, ResLoader, BuffBaseConfig, ViewCenter, CardBaseConfig, SpriteFrameComponent, GlobalEventManager, UIEvent, GameNetRequest, CardItem, CardsDrawingView;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      PageView = module.PageView;
      Node = module.Node;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
      RichText = module.RichText;
      v3 = module.v3;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }, function (module) {
      CardsDataManager = module.CardsDataManager;
    }, function (module) {
      CardSuitConfig = module.CardSuitConfig;
    }, function (module) {
      ResLoader = module.ResLoader;
    }, function (module) {
      BuffBaseConfig = module.BuffBaseConfig;
    }, function (module) {
      ViewCenter = module.ViewCenter;
    }, function (module) {
      CardBaseConfig = module.CardBaseConfig;
    }, function (module) {
      SpriteFrameComponent = module.default;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }, function (module) {
      CardItem = module.CardItem;
    }, function (module) {
      CardsDrawingView = module.CardsDrawingView;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "30c2aMz7AFKeZCp+r1p6/6u", "CardsView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CardsView = exports('CardsView', (_dec = ccclass('CardsView'), _dec2 = property(Label), _dec3 = property(PageView), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(CardsView, _ViewComponent);
        function CardsView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ViewComponent.call.apply(_ViewComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labelPriceDraw", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pageview", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemModel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemPageModel", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelPage", _descriptor5, _assertThisInitialized(_this));
          _this.pageNum = 2;
          _this.totalPage = 0;
          _this.items = [];
          _this.datas = [];
          _this.drawingView = void 0;
          return _this;
        }
        var _proto = CardsView.prototype;
        _proto.start = function start() {
          this.drawingView = this.node.getComponentInChildren(CardsDrawingView);
          this.labelPriceDraw.string = "50";
          this.datas = CardsDataManager.getInstance().cardsSuitInfo;
          this.itemPageModel.active = false;
          this.itemModel.active = false;
          this.init();
          CardsDataManager.getInstance().drawState.stateChangeHandler.add(this.onCardsDraw.bind(this));
          GlobalEventManager.getInstance().on(UIEvent.RefreshCardsView, this.onCardsListRefreshListener, this);
        };
        _proto.onDestroy = function onDestroy() {
          CardsDataManager.getInstance().drawState.stateChangeHandler.remove(this.onCardsDraw.bind(this));
          GlobalEventManager.getInstance().off(UIEvent.RefreshCardsView, this.onCardsListRefreshListener, this);
        };
        _proto.onCardsDraw = function onCardsDraw(state) {
          if (state == 0 && (CardsDataManager.getInstance().newCards || CardsDataManager.getInstance().recoveryCards)) {
            this.drawingView.node.active = true;
            this.drawingView.init();
          }
        };
        _proto.onCardsListRefreshListener = function onCardsListRefreshListener() {
          this.datas = CardsDataManager.getInstance().cardsSuitInfo;
          for (var i = 0; i < this.items.length; i++) {
            this.onItemInit(this.items[i], this.datas[i], i);
          }
        };
        _proto.onPageListener = function onPageListener(event) {
          this.labelPage.string = this.pageview.getCurrentPageIndex() + 1 + "/" + this.totalPage;
        };
        _proto.init = function init() {
          var page = Math.ceil(this.datas.length / this.pageNum);
          this.totalPage = page;
          for (var n = 0; n < page; n++) {
            var itemPage = instantiate(this.itemPageModel);
            itemPage.active = true;
            this.pageview.addPage(itemPage);
            for (var i = 0; i < this.pageNum; i++) {
              var item = instantiate(this.itemModel);
              item.active = true;
              item.parent = itemPage;
              this.items.push(item);
              var index = n * this.pageNum + i;
              this.onItemInit(item, index < this.datas.length ? this.datas[index] : null, index);
            }
          }
          this.labelPage.string = "1/" + page;
        };
        _proto.onItemInit = function onItemInit(item, data, index) {
          var _this2 = this;
          var groupLayer = [item.getChildByName("layer_1"), item.getChildByName("layer_2"), item.getChildByName("layer_3")];
          var cfg = CardSuitConfig.getInstance().getDataById(data.suitId);
          var icon = item.getChildByName("icon").getComponent(Sprite);
          var title = item.getChildByName("labelName").getComponent(Label);
          var suitsBuffId = cfg.buffInfo.split("_");
          title.string = cfg.name;
          ResLoader.instance.loadSpriteFrame(icon, "icon_suit_" + cfg.path);
          var _loop = function _loop() {
            var groupData = data.group[i];
            var buffCfg = BuffBaseConfig.getInstance().getDataById(Number(suitsBuffId[i]));
            var layer = groupLayer[i];
            var groupTitle = layer.getChildByName("Label-title").getComponent(Label);
            var lightFrame = layer.getChildByName("lightFrame");
            var btnDisable = layer.getChildByName("play_btn-002");
            var btnAvailable = layer.getChildByName("play_btn-001");
            var btnActive = layer.getChildByName("play_btn");
            var textDesc = layer.getChildByName("RichText-desc").getComponent(RichText);
            var iconLv = layer.getChildByName("iconLv").getComponent(SpriteFrameComponent);
            var iconBuff = layer.getChildByName("iconBuff");
            var iconBuffStar = iconBuff.getChildByName("stars");
            var canActive = true;
            for (var _iterator = _createForOfIteratorHelperLoose(groupData.cards), _step; !(_step = _iterator()).done;) {
              var _data = _step.value;
              if (!_data.level) {
                canActive = false;
                break;
              }
            }
            textDesc.string = buffCfg.info;
            groupTitle.string = buffCfg.name;
            lightFrame.active = groupData.status == 3;
            btnDisable.active = !canActive;
            var level = canActive ? groupData.level : 0;
            var buffIconIds = buffCfg.path.split("_");
            if (canActive) ResLoader.instance.loadSpriteFrame(iconBuff.getComponent(Sprite), "icon_buff_" + buffIconIds[level == 4 ? 2 : 1]);else ResLoader.instance.loadSpriteFrame(iconBuff.getComponent(Sprite), "icon_buff_" + buffIconIds[0]);
            iconLv.node.setPosition(v3(level == 4 ? -100 : -82, iconLv.node.position.y, iconLv.node.position.z));
            iconLv.setFrameByIndex(level);
            iconBuffStar.children.forEach(function (t, index) {
              return t.active = index < level && level != 4;
            });
            if (lightFrame.active) lightFrame.getComponent(SpriteFrameComponent).setFrameByIndex(level == 4 ? 1 : 0);
            // textDesc.string = buffCfg.info;
            if (!btnDisable.active) {
              btnActive.active = canActive && groupData.status == 3;
              btnAvailable.active = !btnActive.active;
              btnAvailable.targetOff(_this2);
              btnAvailable.on(Node.EventType.TOUCH_END, function () {
                GameNetRequest.activeCardBuff(data.suitId, groupData.groupType);
              }, _this2);
            } else {
              btnAvailable.active = false;
              btnActive.active = false;
            }
            layer.getChildByName("layout").children.forEach(function (itemCard, index) {
              var cardData = groupData.cards[index];
              var cardCfg = CardBaseConfig.getInstance().getDataById(cardData.cardId);
              itemCard.getComponent(CardItem).init(cardData.level, cardCfg.path.split("_"));
              itemCard.targetOff(_this2);
              if (cardData.level) {
                itemCard.on(Node.EventType.TOUCH_END, function () {
                  ViewCenter.instance.show("CardUpgradeView", {
                    config: cardCfg,
                    data: cardData
                  });
                }, _this2);
              }
            });
          };
          for (var i = 0; i < data.group.length; i++) {
            _loop();
          }
        };
        return CardsView;
      }(ViewComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelPriceDraw", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pageview", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemModel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "itemPageModel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelPage", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CardUpgradeHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NetWorkHandler.ts', './GameNetRequest.ts'], function (exports) {
  var _inheritsLoose, cclegacy, NetWorkHandler, GameNetRequest;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }],
    execute: function () {
      cclegacy._RF.push({}, "81c38Gcj5pOspuwU9K8gQiL", "CardUpgradeHandler", undefined);
      var CardUpgradeHandler = exports('CardUpgradeHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(CardUpgradeHandler, _NetWorkHandler);
        function CardUpgradeHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = CardUpgradeHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("CardUpgradeHandler!!", this.data);
          GameNetRequest.getCardsInfo();
        };
        return CardUpgradeHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChangeNickView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts', './GameDataManager.ts', './GlobalConfig.ts', './UserNetRequest.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EditBox, ViewComponent, GameDataManager, GlobalConstant, UserNetRequest;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EditBox = module.EditBox;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      GlobalConstant = module.GlobalConstant;
    }, function (module) {
      UserNetRequest = module.UserNetRequest;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "f2a25BNOeNNMqSKso1GP80E", "ChangeNickView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ChangeNickView = exports('ChangeNickView', (_dec = ccclass('ChangeNickView'), _dec2 = property(EditBox), _dec(_class = (_class2 = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(ChangeNickView, _ViewComponent);
        function ChangeNickView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ViewComponent.call.apply(_ViewComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "editBox", _descriptor, _assertThisInitialized(_this));
          _this.cannotSaveTip = void 0;
          return _this;
        }
        var _proto = ChangeNickView.prototype;
        _proto.start = function start() {
          this.editBox.string = GameDataManager.getInstance().data.nick.cur;
        };
        _proto.onEditReturn = function onEditReturn(box) {
          if (box.string == GameDataManager.getInstance().data.nick.cur) {
            this.cannotSaveTip = "昵称重复";
            return;
          }
          if (box.string == "") {
            this.cannotSaveTip = "昵称不能为空";
            return;
          }
          this.cannotSaveTip = null;
        };
        _proto.onClickSave = function onClickSave() {
          if (this.cannotSaveTip) {
            GlobalConstant.showFloatingTip(this.cannotSaveTip);
            return;
          }
          UserNetRequest.changeNick(this.editBox.string);
          GameDataManager.getInstance().data.nick.set(this.editBox.string);
          this.close();
        };
        return ChangeNickView;
      }(ViewComponent), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "editBox", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Character.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SpriteAnimator.ts', './GameDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, v3, tween, Component, SpriteAnimator, GameDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      SpriteAnimator = module.SpriteAnimator;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "1b051srRw9LLIZp6C8e7Nlr", "Character", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Character = exports('Character', (_dec = ccclass('Character'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Character, _Component);
        function Character() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.direction = 1;
          _this.icon = void 0;
          _this.animator = void 0;
          return _this;
        }
        var _proto = Character.prototype;
        _proto.start = function start() {
          this.icon = this.node.getChildByName("icon");
          this.animator = this.icon.getComponent(SpriteAnimator);
          this.animator.init(GameDataManager.getInstance().data.role.cur);
          GameDataManager.getInstance().data.role.addChangeListener(this.onRoleChangeListener, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().data.role.removeChangeListener(this.onRoleChangeListener, this);
        };
        _proto.onRoleChangeListener = function onRoleChangeListener(cur) {
          this.animator.init(cur);
        };
        _proto.setDirection = function setDirection(dir) {
          this.direction = dir;
          this.icon = this.node.getChildByName("icon");
          this.icon.setScale(v3(this.direction, 1, 1));
        };
        _proto.jump = function jump() {
          tween(this.icon).by(0.1, {
            position: v3(0, 50, 0)
          }, {
            easing: "backOut"
          }).by(0.1, {
            position: v3(0, -50, 0)
          }, {
            easing: "cubicIn"
          }).start();
        };
        return Character;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChatAdaptLabel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, UITransform, size, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      UITransform = module.UITransform;
      size = module.size;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "3c071ZqaoZN9axZdhupqMns", "ChatAdaptLabel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ChatAdaptLabel = exports('default', (_dec = menu("1-UIAdaptive/ChatAdaptLabel"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ChatAdaptLabel, _Component);
        function ChatAdaptLabel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "offsetWidth", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "offsetHeight", _descriptor2, _assertThisInitialized(_this));
          _this.label = void 0;
          _this.limitW = void 0;
          _this.labelTransform = void 0;
          return _this;
        }
        var _proto = ChatAdaptLabel.prototype;
        _proto.onLoad = function onLoad() {
          this.label = this.node.getComponentInChildren(Label);
          this.labelTransform = this.label.node.getComponent(UITransform);
          this.limitW = this.labelTransform.width;
        };
        _proto.setContent = function setContent(content) {
          this.label.overflow = Label.Overflow.NONE;
          this.label.string = content;
          this.label.updateRenderData(true);
          // this.label["_forceUpdateRenderData"]();
          var w = Math.min(this.labelTransform.width, this.limitW);
          if (w < this.limitW) w += 10;
          this.label.overflow = Label.Overflow.RESIZE_HEIGHT;
          this.labelTransform.setContentSize(size(w, 0));
          this.label.updateRenderData(true);
          // this.label["_forceUpdateRenderData"]();
          this.node.getComponent(UITransform).setContentSize(size(w + this.offsetWidth, this.labelTransform.height + this.offsetHeight));
        };
        return ChatAdaptLabel;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "offsetWidth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "offsetHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickAudio.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './AudioComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ClickComponent, AudioComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      AudioComponent = module.AudioComponent;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "fe582yImf9IKaHrahCHHNuH", "ClickAudio", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var ClickAudio = exports('default', (_dec = menu("1-UIClick/ClickAudio"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ClickAudio, _ClickComponent);
        function ClickAudio() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ClickComponent.call.apply(_ClickComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "audioName", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isLoop", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ClickAudio.prototype;
        _proto.onClick = function onClick(event) {
          AudioComponent.instance.play(this.audioName, this.isLoop);
        };
        return ClickAudio;
      }(ClickComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isLoop", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickBackLobbyComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './SceneManager.ts', './GlobalConfig.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ClickComponent, SceneManager, DefaultScene;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      SceneManager = module.default;
    }, function (module) {
      DefaultScene = module.DefaultScene;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a8962ysj6RFEpRf/FqJry7n", "ClickBackLobbyComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ClickBackLobbyComponent = exports('default', (_dec = menu("1-UIClick/ClickBackLobbyComponent"), ccclass(_class = _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ClickBackLobbyComponent, _ClickComponent);
        function ClickBackLobbyComponent() {
          return _ClickComponent.apply(this, arguments) || this;
        }
        var _proto = ClickBackLobbyComponent.prototype;
        _proto.onClick = function onClick(event) {
          SceneManager.getInstance().loadScene(DefaultScene.Lobby);
        };
        return ClickBackLobbyComponent;
      }(ClickComponent)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickClearLocalData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './StorageManager.ts', './GlobalConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ClickComponent, StorageManager, GlobalConstant;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      StorageManager = module.default;
    }, function (module) {
      GlobalConstant = module.GlobalConstant;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "5bc48yuWS9MiodQgVwshK8p", "ClickClearLocalData", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ClickClearLocalData = exports('default', (_dec = menu("1-UIClick/ClickClearLocalData"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ClickClearLocalData, _ClickComponent);
        function ClickClearLocalData() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ClickComponent.call.apply(_ClickComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "clickTime", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "specifyDataKey", _descriptor2, _assertThisInitialized(_this));
          _this._time = 0;
          return _this;
        }
        var _proto = ClickClearLocalData.prototype;
        _proto.onClick = function onClick(event) {
          this._time++;
          if (this.clickTime == this._time) {
            this._time = 0;
            this.clear();
          }
        };
        _proto.clear = function clear() {
          if (this.specifyDataKey != "") StorageManager.getInstance().remove(this.specifyDataKey);else StorageManager.getInstance().clear();
          GlobalConstant.showFloatingTip("已清除存档，请重启游戏");
        };
        return ClickClearLocalData;
      }(ClickComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clickTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "specifyDataKey", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickCloseView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './ViewComponent.ts', './ViewCenter.ts', './TweenAnimBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, ClickComponent, ViewComponent, ViewCenter, TweenAnimBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }, function (module) {
      ViewCenter = module.ViewCenter;
    }, function (module) {
      TweenAnimBase = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "6c292Xw629KQL+aYSS7yZ+/", "ClickCloseView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var ClickCloseView = exports('default', (_dec = menu("1-UIClick/ClickCloseView"), _dec2 = property(Node), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ClickCloseView, _ClickComponent);
        function ClickCloseView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ClickComponent.call.apply(_ClickComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "doAnim", _descriptor2, _assertThisInitialized(_this));
          _this.quitOnce = false;
          return _this;
        }
        var _proto = ClickCloseView.prototype;
        _proto.onClick = function onClick(event) {
          var _this2 = this;
          if (this.quitOnce) return;
          this.quitOnce = true;
          var anims = this.node.getComponents(TweenAnimBase);
          var cnt = 0;
          if (anims && anims.length > 0 && this.doAnim) {
            anims.forEach(function (t) {
              t.callOver = function () {
                cnt++;
                if (cnt == anims.length) _this2.hide();
              };
              t["do"]();
            });
          } else this.hide();
        };
        _proto.hide = function hide() {
          var viewComponent = this.target.getComponent(ViewComponent);
          viewComponent ? viewComponent.close() : ViewCenter.instance.hide(this.target.name);
        };
        return ClickCloseView;
      }(ClickComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "doAnim", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "52e266X3YlD+YY2vlrK2w+C", "ClickComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ClickComponent = exports('default', ccclass(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClickComponent, _Component);
        function ClickComponent() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = ClickComponent.prototype;
        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
        };
        _proto.onClick = function onClick(event, param) {};
        return ClickComponent;
      }(Component)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickFullScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, screen, ClickComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      screen = module.screen;
    }, function (module) {
      ClickComponent = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "d1e22Pk/tpJV50jq3VAoeiu", "ClickFullScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ClickFullScreen = exports('ClickFullScreen', (_dec = ccclass('ClickFullScreen'), _dec(_class = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ClickFullScreen, _ClickComponent);
        function ClickFullScreen() {
          return _ClickComponent.apply(this, arguments) || this;
        }
        var _proto = ClickFullScreen.prototype;
        _proto.onClick = function onClick(event, param) {
          screen.requestFullScreen();
        };
        return ClickFullScreen;
      }(ClickComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickOpenView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClickComponent.ts', './ViewCenter.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ClickComponent, ViewCenter;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ClickComponent = module.default;
    }, function (module) {
      ViewCenter = module.ViewCenter;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "a9b56n3rY5Dd62//8ft3Z/y", "ClickOpenView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var ClickOpenView = exports('default', (_dec = menu("1-UIClick/ClickOpenView"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_ClickComponent) {
        _inheritsLoose(ClickOpenView, _ClickComponent);
        function ClickOpenView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ClickComponent.call.apply(_ClickComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "viewName", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "paramsObj", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "order", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ClickOpenView.prototype;
        _proto.onClick = function onClick(event) {
          var obj = null;
          try {
            obj = JSON.parse(this.paramsObj);
          } catch (e) {}
          ViewCenter.instance.show(this.viewName, obj, this.order);
        };
        return ClickOpenView;
      }(ClickComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "viewName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "paramsObj", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "order", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ColorSelector.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIRenderer, Color, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIRenderer = module.UIRenderer;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "c280fGNzuJG94mi25DL6CAo", "ColorSelector", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var ColorSelector = exports('default', (_dec = requireComponent(UIRenderer), _dec2 = menu("1-UI/ColorSelector"), _dec3 = property([Color]), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ColorSelector, _Component);
        function ColorSelector() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "colors", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ColorSelector.prototype;
        _proto.set = function set(index) {
          if (index < 0 || index >= this.colors.length) return;
          this.node.getComponent(UIRenderer).color = this.colors[index];
        };
        _proto.setRandom = function setRandom() {
          if (this.colors.length == 0) return;
          this.node.getComponent(UIRenderer).color = this.colors[Math.floor(Math.random() * this.colors.length)];
        };
        return ColorSelector;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "colors", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Constants.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "18274m+7f5CdJfZQQpoSaKi", "Constants", undefined);
      var GameEvent = exports('GameEvent', /*#__PURE__*/function (GameEvent) {
        GameEvent["CharacterJump"] = "CharacterJumpEvent";
        GameEvent["Building"] = "BuildingEvent";
        GameEvent["BuildingEffect"] = "BuildingEffectEvent";
        GameEvent["NewFloor"] = "NewFloorEvent";
        GameEvent["InitBuildings"] = "InitBuildingsEvent";
        GameEvent["UpdateBg"] = "UpdateBg";
        GameEvent["BoardEffect"] = "BoardEffect";
        GameEvent["BuffRefresh"] = "BuffRefresh";
        return GameEvent;
      }({}));
      var RollState = exports('RollState', /*#__PURE__*/function (RollState) {
        RollState[RollState["Idle"] = 0] = "Idle";
        RollState[RollState["Rolling"] = 1] = "Rolling";
        RollState[RollState["CharacterJumping"] = 2] = "CharacterJumping";
        return RollState;
      }({}));
      var AssetCode = exports('AssetCode', /*#__PURE__*/function (AssetCode) {
        AssetCode[AssetCode["Default"] = 0] = "Default";
        AssetCode[AssetCode["Soul"] = 100] = "Soul";
        AssetCode[AssetCode["Gold"] = 101] = "Gold";
        AssetCode[AssetCode["Shield"] = 102] = "Shield";
        AssetCode[AssetCode["Dice"] = 103] = "Dice";
        return AssetCode;
      }({}));
      var GridType = exports('GridType', /*#__PURE__*/function (GridType) {
        GridType[GridType["None"] = 0] = "None";
        GridType[GridType["Coin"] = 1] = "Coin";
        GridType[GridType["Community"] = 2] = "Community";
        GridType[GridType["Item"] = 3] = "Item";
        GridType[GridType["Intrusion"] = 4] = "Intrusion";
        GridType[GridType["Draw"] = 5] = "Draw";
        return GridType;
      }({}));
      var RewardType = exports('RewardType', /*#__PURE__*/function (RewardType) {
        RewardType[RewardType["None"] = 0] = "None";
        RewardType[RewardType["Coin"] = 1] = "Coin";
        RewardType[RewardType["Dice"] = 2] = "Dice";
        RewardType[RewardType["Item"] = 3] = "Item";
        RewardType[RewardType["Intrusion"] = 4] = "Intrusion";
        return RewardType;
      }({}));
      var CacheRewardScene = exports('CacheRewardScene', /*#__PURE__*/function (CacheRewardScene) {
        CacheRewardScene[CacheRewardScene["None"] = 0] = "None";
        CacheRewardScene[CacheRewardScene["FromRolling"] = 1] = "FromRolling";
        return CacheRewardScene;
      }({}));
      var IntrusionVfxType = exports('IntrusionVfxType', /*#__PURE__*/function (IntrusionVfxType) {
        IntrusionVfxType[IntrusionVfxType["None"] = 0] = "None";
        IntrusionVfxType[IntrusionVfxType["AirBoat"] = 1] = "AirBoat";
        return IntrusionVfxType;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CustomPreloader.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './GlobalConfig.ts', './ResLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, GlobalEventManager, GlobalEvent, ResLoader, ResType;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "bb7b2FnlRpOjrnzizFKfekv", "CustomPreloader", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CustomPreloader = exports('CustomPreloader', (_dec = ccclass('CustomPreloader'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CustomPreloader, _Component);
        function CustomPreloader() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = CustomPreloader.prototype;
        _proto.start = function start() {
          GlobalEventManager.getInstance().emit(GlobalEvent.AddPreload);
          ResLoader.instance.load("L1_level_1", ResType.TileMap, function () {
            GlobalEventManager.getInstance().emit(GlobalEvent.Preloaded);
          });
        };
        _proto.update = function update(deltaTime) {};
        return CustomPreloader;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DeltaTimeComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3;
      cclegacy._RF.push({}, "89089tuzJtFmbdy1jMzQBWW", "DeltaTimeComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var DeltaTimeComponent = exports('DeltaTimeComponent', (_dec = ccclass('DeltaTimeComponent'), _dec2 = menu("1-Other/DeltaTimeComponent"), _dec(_class = _dec2(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DeltaTimeComponent, _Component);
        function DeltaTimeComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "timeScale", _descriptor, _assertThisInitialized(_this));
          _this.oldTick = director.tick;
          _this._bulletTime = false;
          return _this;
        }
        var _proto = DeltaTimeComponent.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          director.tick = function (dt) {
            var _this2$oldTick;
            (_this2$oldTick = _this2.oldTick) == null || _this2$oldTick.call(director, dt * (_this2._bulletTime ? _this2.timeScale : 1));
          };
          DeltaTimeComponent.instance = this;
        };
        _createClass(DeltaTimeComponent, [{
          key: "bulletTime",
          get: function get() {
            return this._bulletTime;
          },
          set: function set(val) {
            this._bulletTime = val;
          }
        }]);
        return DeltaTimeComponent;
      }(Component), _class3.instance = void 0, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "timeScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Dice.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RollLogic.ts', './GameDataManager.ts', './TweenAnimBase.ts', './GlobalEventManager.ts', './Constants.ts', './GameLocalData.ts', './NetComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, Animation, Component, RollLogic, GameDataManager, TweenAnimBase, GlobalEventManager, RollState, GameEvent, GameLocalData, NetComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      RollLogic = module.RollLogic;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      TweenAnimBase = module.default;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      RollState = module.RollState;
      GameEvent = module.GameEvent;
    }, function (module) {
      GameLocalData = module.default;
    }, function (module) {
      NetComponent = module.NetComponent;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "c8d0aK3WiJKPYx+NsgcOZ5m", "Dice", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Dice = exports('Dice', (_dec = ccclass('Dice'), _dec2 = property([Sprite]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Dice, _Component);
        function Dice() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "spDices", _descriptor, _assertThisInitialized(_this));
          _this.totalPoint = 0;
          return _this;
        }
        var _proto = Dice.prototype;
        _proto.start = function start() {
          RollLogic.getInstance().point.addChangeListener(this.onPoint, this);
          RollLogic.getInstance().rollState.stateChangeHandler.add(this.onRollStateChange.bind(this));
        };
        _proto.onDestroy = function onDestroy() {
          RollLogic.getInstance().point.removeChangeListener(this.onPoint, this);
          RollLogic.getInstance().rollState.stateChangeHandler.add(this.onRollStateChange.bind(this));
        };
        _proto.onPoint = function onPoint(point) {
          this.totalPoint = 0;
          //如果一次有两颗骰子，则这里需要另外处理
          for (var i = 0; i < this.spDices.length; i++) {
            var diceNode = this.spDices[i].node;
            if (diceNode.active) {
              this.showDicePoints(diceNode, point, i);
            }
          }
        };
        _proto.onRollStateChange = function onRollStateChange(state, _, isAdd) {
          if (state == RollState.Rolling && isAdd) {
            this.totalPoint = 0;
            for (var i = 0; i < this.spDices.length; i++) {
              var diceNode = this.spDices[i].node;
              diceNode.active = i < GameLocalData.instance.data.rollDiceNum.cur;
              if (diceNode.active) {
                diceNode.getComponent(TweenAnimBase).stopAnim();
                var anim = diceNode.getComponent(Animation);
                anim.play("dice_roll");
                if (NetComponent.instance.localDebug) {
                  var points = GameDataManager.getInstance().getDicePoint();
                  this.showDicePoints(diceNode, points[i], i);
                }
              }
            }
          }
        };
        _proto.showDicePoints = function showDicePoints(diceNode, point, index) {
          var _this2 = this;
          if (diceNode.active) {
            this.totalPoint += point;
            diceNode.getComponent(TweenAnimBase).stopAnim();
            var anim = diceNode.getComponent(Animation);
            setTimeout(function () {
              anim.play("dice_out_" + point);
              diceNode.getComponent(TweenAnimBase)["do"]();
            }, 600);
            setTimeout(function () {
              anim.play("dice_loop_" + point);
            }, 1200);
            setTimeout(function () {
              if (index == GameLocalData.instance.data.rollDiceNum.cur - 1) GlobalEventManager.getInstance().emit(GameEvent.CharacterJump, _this2.totalPoint);
            }, 800);
            setTimeout(function () {
              diceNode.active = false;
              if (index == GameLocalData.instance.data.rollDiceNum.cur - 1) RollLogic.getInstance().rollState.removeState(RollState.Rolling);
            }, 1800);
          }
        };
        return Dice;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "spDices", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DiceAnimation.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Sprite, Component, ResLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      ResLoader = module.ResLoader;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "3ee1azte4xAKL1mYHUOEZla", "DiceAnimation", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DiceAnimation = exports('DiceAnimation', (_dec = ccclass('DiceAnimation'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DiceAnimation, _Component);
        function DiceAnimation() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.curIndex = void 0;
          _this.timer = void 0;
          return _this;
        }
        var _proto = DiceAnimation.prototype;
        _proto.init = function init(start, end, interval, loopTime) {
          var _this2 = this;
          if (loopTime === void 0) {
            loopTime = 0;
          }
          this.curIndex = start;
          var sprite = this.getComponent(Sprite);
          this.timer = setInterval(function () {}, interval);
          this.schedule(function () {
            _this2.curIndex++;
            if (_this2.curIndex > end) {
              _this2.curIndex = start;
            }
            ResLoader.instance.loadSpriteFrame(sprite, "dice_out_" + _this2.curIndex);
          }, interval, loopTime);
          return this;
        };
        return DiceAnimation;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DraggableComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, v3, UITransform, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      v3 = module.v3;
      UITransform = module.UITransform;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "6a0abSTCD9N4q1mNKkQ1wLX", "DraggableComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var DraggableComponent = exports('default', (_dec = menu("1-UI/DraggableComponent"), ccclass(_class = _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DraggableComponent, _Component);
        function DraggableComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.startCall = void 0;
          _this.moveCall = void 0;
          _this.endCall = void 0;
          _this.disable = false;
          _this._isDragging = false;
          _this.offsetY = null;
          return _this;
        }
        var _proto = DraggableComponent.prototype;
        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }

        //固定偏移图片下方
        ;

        _proto.setFixedY = function setFixedY(y) {
          this.offsetY = y;
        };
        _proto.onTouchStart = function onTouchStart(event) {
          if (this.disable) return;
          this._isDragging = true;
          if (this.startCall) this.startCall();
        };
        _proto.onTouchMove = function onTouchMove(event) {
          if (this.disable) return;
          if (!this._isDragging) return;
          var touchPos = v3(event.getUILocation().x, event.getUILocation().y);
          var localPos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(touchPos);
          this.node.setPosition(localPos);
          if (this.offsetY != null) {
            localPos.x = 0;
            localPos.y = this.node.getComponent(UITransform).height * 0.5 + this.offsetY;
            localPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(localPos);
            localPos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(localPos);
            this.node.setPosition(localPos);
          }
          if (this.moveCall) this.moveCall();
        };
        _proto.onTouchEnd = function onTouchEnd(event) {
          if (this.disable) return;
          this._isDragging = false;
          if (this.endCall) this.endCall();
        };
        return DraggableComponent;
      }(Component)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Encrypter.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "de9e9ROAkpL05W3w8xdsctq", "Encrypter", undefined);
      //加密工具
      var Encrypter = exports('default', /*#__PURE__*/function () {
        function Encrypter() {}
        Encrypter.Encode = function Encode(str) {
          return str;
        };
        Encrypter.Decode = function Decode(str) {
          return str;
        };
        return Encrypter;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EntryAnimControll.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuildingDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, BuildingDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "0561f1Q1BVDm5psMSHpxy+7", "EntryAnimControll", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var EntryAnimControll = exports('EntryAnimControll', (_dec = ccclass('EntryAnimControll'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EntryAnimControll, _Component);
        function EntryAnimControll() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = EntryAnimControll.prototype;
        _proto.start = function start() {
          if (BuildingDataManager.getInstance().totalStorey > 2) ;
        };
        return EntryAnimControll;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExInteger.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './Handler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, tween, Singleton, Handler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      Handler = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e2130XTF+xLeqP4CMOt/BNf", "ExInteger", undefined);
      var ExInteger = exports('default', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(ExInteger, _Singleton);
        function ExInteger() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this.cur = 0;
          _this.last = 0;
          _this.min = 0;
          _this.max = 0;
          _this.canOverMax = false;
          _this.writeFunc = void 0;
          _this.changeFuncs = [];
          _this.tweenChangeFuncs = [];
          return _this;
        }
        var _proto = ExInteger.prototype;
        _proto.init = function init(origin, _max, _min) {
          if (_max === void 0) {
            _max = null;
          }
          if (_min === void 0) {
            _min = 0;
          }
          this.cur = origin;
          this.last = origin;
          this.max = _max;
          this.min = _min;
          return this;
        };
        _proto.tweenAdd = function tweenAdd(val, save, duration, delay) {
          var _this2 = this;
          if (save === void 0) {
            save = true;
          }
          if (duration === void 0) {
            duration = 0.5;
          }
          if (delay === void 0) {
            delay = 0;
          }
          var last = this.last;
          this.cur += val;
          if (this.max != null && this.cur > this.max && !this.canOverMax) this.cur = this.max;else if (this.cur < this.min) this.cur = this.min;
          this.last = this.cur;
          var cur = this.cur;
          if (save && this.writeFunc) this.writeFunc.invoke(cur, last);
          var data = {
            num: last
          };
          tween(data).delay(delay).to(duration, {
            num: cur
          }, {
            progress: function progress(start, end, current, t) {
              var val = Math.ceil(start + (end - start) * t);
              _this2.tweenChangeFuncs.forEach(function (t) {
                return t.invoke(val);
              });
              return start + (end - start) * t;
            }
          }).call(function () {
            return _this2.changeFuncs.forEach(function (t) {
              return t.invoke(cur, last, _this2.max);
            });
          }).start();
        };
        _proto.add = function add(val, save) {
          var _this3 = this;
          if (save === void 0) {
            save = true;
          }
          this.cur += val;
          if (this.max != null && this.cur > this.max && !this.canOverMax) this.cur = this.max;else if (this.cur < this.min) this.cur = this.min;
          this.changeFuncs.forEach(function (t) {
            return t.invoke(_this3.cur, _this3.last, _this3.max);
          });
          if (save && this.writeFunc) this.writeFunc.invoke(this.cur, this.last);
          this.last = this.cur;
        };
        _proto.set = function set(val, save) {
          var _this4 = this;
          if (save === void 0) {
            save = true;
          }
          this.cur = val;
          this.changeFuncs.forEach(function (t) {
            return t.invoke(_this4.cur, _this4.last, _this4.max);
          });
          if (save && this.writeFunc && this.last != val) this.writeFunc.invoke(this.cur, this.last);
          this.last = this.cur;
        };
        _proto.isMax = function isMax() {
          return this.cur >= this.max;
        };
        _proto.isOverMax = function isOverMax() {
          return this.cur > this.max;
        };
        _proto.isLow = function isLow() {
          return this.cur <= this.min;
        };
        _proto.full = function full() {
          this.set(this.max);
        };
        _proto.next = function next() {
          if (this.max) return Math.min(this.cur + 1, this.max);
          return this.cur + 1;
        };
        _proto.setWriteListener = function setWriteListener(func, caller) {
          this.writeFunc = new Handler(func, caller);
          return this;
        };
        _proto.addChangeListener = function addChangeListener(func, caller) {
          this.changeFuncs.push(new Handler(func, caller));
          return this;
        };
        _proto.removeChangeListener = function removeChangeListener(func, caller) {
          var index = this.changeFuncs.findIndex(function (t) {
            return t.call.toString() == func.toString() && t.caller == caller;
          });
          if (index >= 0) this.changeFuncs.splice(index, 1);
        };
        _proto.addTweenChangeListener = function addTweenChangeListener(func, caller) {
          this.tweenChangeFuncs.push(new Handler(func, caller));
          return this;
        };
        _proto.removeTweenChangeListener = function removeTweenChangeListener(func, caller) {
          var index = this.tweenChangeFuncs.findIndex(function (t) {
            return t.call.toString() == func.toString() && t.caller == caller;
          });
          if (index >= 0) this.tweenChangeFuncs.splice(index, 1);
        };
        _proto.clearListener = function clearListener() {
          this.changeFuncs = [];
          this.tweenChangeFuncs = [];
        };
        return ExInteger;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExString.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './Handler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, Handler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      Handler = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "545fcdFvktEz6ESQHat4phD", "ExString", undefined);
      var ExString = exports('default', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(ExString, _Singleton);
        function ExString() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this.cur = void 0;
          _this.last = void 0;
          _this.writeFunc = void 0;
          _this.changeFuncs = [];
          return _this;
        }
        var _proto = ExString.prototype;
        _proto.init = function init(origin) {
          this.cur = origin;
          return this;
        };
        _proto.set = function set(val, save) {
          var _this2 = this;
          if (save === void 0) {
            save = true;
          }
          this.cur = val;
          if (this.last != val) {
            this.changeFuncs.forEach(function (t) {
              return t.invoke(_this2.cur, _this2.last);
            });
            if (save && this.writeFunc) this.writeFunc.invoke(this.cur, this.last);
          }
          this.last = this.cur;
        };
        _proto.setWriteListener = function setWriteListener(func, caller) {
          this.writeFunc = new Handler(func, caller);
          return this;
        };
        _proto.addChangeListener = function addChangeListener(func, caller) {
          this.changeFuncs.push(new Handler(func, caller));
          return this;
        };
        _proto.removeChangeListener = function removeChangeListener(func, caller) {
          this.changeFuncs.splice(this.changeFuncs.findIndex(function (t) {
            return t.call.toString() == func.toString() && t.caller == caller;
          }), 1);
        };
        _proto.clearListener = function clearListener() {
          this.changeFuncs = [];
        };
        return ExString;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FloatingView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, ViewComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "694f9A6MmROSYY3BD+Kr9w8", "FloatingView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FloatingView = exports('FloatingView', (_dec = ccclass('FloatingView'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(FloatingView, _ViewComponent);
        function FloatingView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ViewComponent.call.apply(_ViewComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labelContent", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = FloatingView.prototype;
        _proto.start = function start() {
          if (this.params) this.labelContent.string = this.params;
        };
        _proto.onEnable = function onEnable() {
          if (this.params) this.labelContent.string = this.params;
        };
        return FloatingView;
      }(ViewComponent), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelContent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FriendsDataManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ExInteger.ts', './Singleton.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ExInteger, Singleton;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ExInteger = module.default;
    }, function (module) {
      Singleton = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fe9bfoc3R5DG5AnnEPb5tyE", "FriendsDataManager", undefined);
      var FriendsDataManager = exports('FriendsDataManager', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(FriendsDataManager, _Singleton);
        function FriendsDataManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this.soulRankData = void 0;
          _this.myRank = new ExInteger().init(0);
          _this.soulRankDataInit = new ExInteger().init(0);
          return _this;
        }
        return FriendsDataManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameDataManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ExInteger.ts', './Utils.ts', './Singleton.ts', './GameLocalData.ts', './ExString.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ExInteger, Utils, Singleton, GameLocalData, ExString;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ExInteger = module.default;
    }, function (module) {
      Utils = module.default;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      GameLocalData = module.default;
    }, function (module) {
      ExString = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1ebe3wEDS1I2KnxP1TYNJnX", "GameDataManager", undefined);
      var UserGameData = function UserGameData() {
        /** 骰子资产数量 */
        this.dice = new ExInteger().init(0);
        /** 灵魂点数 */
        this.soul = new ExInteger().init(0);
        /** 金币数 */
        this.gold = new ExInteger().init(1000000);
        /** 护盾数 */
        this.shield = new ExInteger().init(2);
        /** 当前层数 */
        this.floor = new ExInteger().init(1);
        /** 角色当前位置 */
        this.pos = new ExInteger().init(1);
        /** 角色昵称 */
        this.nick = new ExString().init("Boom Up");
        /** 角色头像 */
        this.avatar = new ExInteger().init(0);
        /** 玩家ID */
        this.playerId = new ExInteger().init(0);
        /** 角色皮肤ID */
        this.role = new ExInteger().init(1);
      };
      var GameDataManager = exports('default', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(GameDataManager, _Singleton);
        function GameDataManager() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = new UserGameData();
          _this.curMulti = 0;
          _this.diceMax = 80;
          _this.invasion = new ExInteger().init(0);
          _this.invasionTarget = 0;
          _this.invasionTargetNick = void 0;
          _this.invasionGold = new ExInteger().init(0);
          _this.invasionVfxState = new ExInteger().init(0);
          _this.owndRoles = [1];
          _this.diceRet = [1];
          _this.data.dice.set(_this.diceMax);
          return _this;
        }
        var _proto = GameDataManager.prototype;
        _proto.useDice = function useDice() {
          var num = GameLocalData.instance.data.rollDiceNum.cur * GameLocalData.instance.data.multi.cur;
          if (this.data.dice.cur < num) {
            return false;
          }
          this.curMulti = GameLocalData.instance.data.multi.cur;
          this.data.dice.add(-num);
          return true;
        };
        _proto.isDiceEnough = function isDiceEnough() {
          var num = GameLocalData.instance.data.rollDiceNum.cur * GameLocalData.instance.data.multi.cur;
          return this.data.dice.cur >= num;
        };
        _proto.setDicePoint = function setDicePoint() {
          this.diceRet = [];
          for (var i = 0; i < GameLocalData.instance.data.rollDiceNum.cur; i++) {
            var rand = Utils.randomRange(1, 6);
            this.diceRet.push(rand);
          }
        };
        _proto.getDicePoint = function getDicePoint() {
          return this.diceRet;
        };
        _proto.getTotalDicePoint = function getTotalDicePoint() {
          var total = 0;
          for (var i = 0; i < this.diceRet.length; i++) {
            total += this.diceRet[i];
          }
          return total;
        };
        return GameDataManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameLocalData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ExInteger.ts', './LocalDataComponent.ts', './GameDataManager.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, ExInteger, LocalDataComponent, GameDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ExInteger = module.default;
    }, function (module) {
      LocalDataComponent = module.default;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "70621E/nmlNW6qEMc5ymddQ", "GameLocalData", undefined);
      var GameData = function GameData() {
        this.multi = new ExInteger().init(1);
        /** 一次扔几颗骰子 */
        this.rollDiceNum = new ExInteger().init(1);
        this.token = void 0;
      };
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var GameLocalData = exports('default', ccclass(_class = (_class2 = /*#__PURE__*/function (_LocalDataComponent) {
        _inheritsLoose(GameLocalData, _LocalDataComponent);
        function GameLocalData() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _LocalDataComponent.call.apply(_LocalDataComponent, [this].concat(args)) || this;
          _this.key = "GameLocalData";
          _this.multis = [1, 2, 5, 10, 20, 50, 100, 200, 500];
          _this.validMultis = [];
          return _this;
        }
        var _proto = GameLocalData.prototype;
        _proto.defaultInit = function defaultInit() {
          GameLocalData.instance = this;
          return new GameData();
        };
        _proto.init = function init() {
          _LocalDataComponent.prototype.init.call(this);

          // if (!this.data.token)
          // {
          //     this.data.token = this.generateRandomString32();
          //     setTimeout(()=>this.save(), 100);
          // }
        };

        _proto.start = function start() {
          this.updateMultiMax(GameDataManager.getInstance().data.dice.cur);
          GameDataManager.getInstance().data.dice.addChangeListener(this.onDiceNumChange, this);
        };
        _proto.onDiceNumChange = function onDiceNumChange(cur, last) {
          this.updateMultiMax(cur);
        };
        _proto.updateMultiMax = function updateMultiMax(diceNum) {
          this.validMultis = [];
          for (var _iterator = _createForOfIteratorHelperLoose(this.multis), _step; !(_step = _iterator()).done;) {
            var value = _step.value;
            if (value * this.data.rollDiceNum.cur <= diceNum) {
              this.validMultis.push(value);
            }
          }
          if (this.validMultis.indexOf(this.data.multi.cur) == -1) {
            if (this.validMultis.length == 0) this.data.multi.set(1);else this.data.multi.set(this.validMultis[this.validMultis.length - 1]);
          }
        };
        _proto.nextMulti = function nextMulti() {
          for (var i = 0; i < this.validMultis.length; i++) {
            if (this.validMultis[i] == this.data.multi.cur) {
              if (i + 1 < this.validMultis.length) {
                this.data.multi.set(this.validMultis[i + 1]);
                return;
              } else {
                this.data.multi.set(this.validMultis[0]);
                return;
              }
            }
          }
        };
        _proto.getIndex = function getIndex() {
          return this.multis.indexOf(this.data.multi.cur);
        };
        _proto.generateRandomString32 = function generateRandomString32() {
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var result = '';
          var charactersLength = characters.length;
          for (var i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
        };
        return GameLocalData;
      }(LocalDataComponent), _class2.instance = void 0, _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameNetRequest.ts", ['cc', './BuildingDataManager.ts', './GameDataManager.ts', './NetConstant.ts', './NetComponent.ts', './NetConfig.ts'], function (exports) {
  var cclegacy, BuildingDataManager, GameDataManager, NetCode, NetComponent, NetConfig;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetCode = module.NetCode;
    }, function (module) {
      NetComponent = module.NetComponent;
    }, function (module) {
      NetConfig = module.NetConfig;
    }],
    execute: function () {
      cclegacy._RF.push({}, "affdb1Uax5HdZTP06GQfgmX", "GameNetRequest", undefined);
      var GameNetRequest = exports('GameNetRequest', /*#__PURE__*/function () {
        function GameNetRequest() {}
        /**
         * 请求掷骰子
         * @param diceMultiple 骰子倍数
         */
        GameNetRequest.roll = function roll(diceMultiple) {
          var _NetComponent$instanc;
          if (diceMultiple === void 0) {
            diceMultiple = 1;
          }
          var buffer = OPRollDice.encode({
            diceMultiple: diceMultiple
          }).finish();
          (_NetComponent$instanc = NetComponent.instance.gameServer) == null || _NetComponent$instanc.send(buffer, NetCode.OPCODE_ROLL_DICE);
        }

        /**
         * 请求楼层信息
         * @param floors 指定需要请求数据的层数
         */;
        GameNetRequest.getBuildingInfo = function getBuildingInfo(floors, playerId) {
          var _NetComponent$instanc2;
          var buffer = OPGetBuildStorey.encode({
            targetId: playerId != null ? playerId : GameDataManager.getInstance().data.playerId.cur,
            currentStorey: floors
          }).finish();
          (_NetComponent$instanc2 = NetComponent.instance.gameServer) == null || _NetComponent$instanc2.send(buffer, NetCode.OPCODE_BUILD_STOREY);
        };
        GameNetRequest.building = function building(buildPostion) {
          var _NetComponent$instanc3;
          var buffer = OPCreateBuild.encode({
            currentStorey: BuildingDataManager.getInstance().storey,
            buildPostion: buildPostion
          }).finish();
          (_NetComponent$instanc3 = NetComponent.instance.gameServer) == null || _NetComponent$instanc3.send(buffer, NetCode.OPCODE_CREATE_BUILD);
        };
        GameNetRequest.intrusion = function intrusion(id, posId) {
          var _NetComponent$instanc4;
          var buffer = OPIntrusion.encode({
            targetId: id,
            postion: posId
          }).finish();
          (_NetComponent$instanc4 = NetComponent.instance.gameServer) == null || _NetComponent$instanc4.send(buffer, NetCode.OPCODE_INTRUSION);
        };
        GameNetRequest.rebuilt = function rebuilt() {
          var _NetComponent$instanc5;
          var buffer = OPReBuild.encode({
            version: NetConfig.instance.data.version
          }).finish();
          (_NetComponent$instanc5 = NetComponent.instance.gameServer) == null || _NetComponent$instanc5.send(buffer, NetCode.OPCODE_REBUILD);
        };
        GameNetRequest.getCardsInfo = function getCardsInfo() {
          var _NetComponent$instanc6;
          var buffer = OPGetCardList.encode({
            version: NetConfig.instance.data.version
          }).finish();
          (_NetComponent$instanc6 = NetComponent.instance.gameServer) == null || _NetComponent$instanc6.send(buffer, NetCode.OPCODE_GET_CARD_LIST);
        };
        GameNetRequest.drawCard = function drawCard() {
          var _NetComponent$instanc7;
          var buffer = OPDrawCards.encode({
            count: 10
          }).finish();
          (_NetComponent$instanc7 = NetComponent.instance.gameServer) == null || _NetComponent$instanc7.send(buffer, NetCode.OPCODE_DRAW_CARD);
        };
        GameNetRequest.cardUpgrade = function cardUpgrade(id) {
          var _NetComponent$instanc8;
          var buffer = OPCardUp.encode({
            dbId: id
          }).finish();
          (_NetComponent$instanc8 = NetComponent.instance.gameServer) == null || _NetComponent$instanc8.send(buffer, NetCode.OPCODE_CARD_UP);
        };
        GameNetRequest.activeCardBuff = function activeCardBuff(suitId, groupId, isActive) {
          var _NetComponent$instanc9;
          if (isActive === void 0) {
            isActive = 1;
          }
          var buffer = OPCardGroupStatus.encode({
            suitId: suitId,
            groupType: groupId,
            type: isActive
          }).finish();
          (_NetComponent$instanc9 = NetComponent.instance.gameServer) == null || _NetComponent$instanc9.send(buffer, NetCode.OPCODE_CARD_GROUP_STATUS);
        };
        return GameNetRequest;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GestureScaling.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './UIConstant.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, v3, size, UITransform, tween, Component, GlobalEventManager, UIEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      v3 = module.v3;
      size = module.size;
      UITransform = module.UITransform;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      UIEvent = module.UIEvent;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "ed7f7UH54NCWrpGsTHo4VZD", "GestureScaling", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GestureScaling = exports('GestureScaling', (_dec = ccclass('GestureScaling'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GestureScaling, _Component);
        function GestureScaling() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "targetNode", _descriptor, _assertThisInitialized(_this));
          _this.startDistance = 0;
          _this.startScale = v3();
          _this.originalScale = v3();
          _this.srcSize = size();
          return _this;
        }
        var _proto = GestureScaling.prototype;
        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          this.originalScale.set(this.targetNode.scale);
          this.srcSize.set(this.targetNode.getComponent(UITransform).contentSize);
          GlobalEventManager.getInstance().on(UIEvent.UpdateBuildingListContentSize, this.onUpdateSize, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.onUpdateSize = function onUpdateSize(height) {
          this.srcSize.set(this.srcSize.width, height);
        };
        _proto.onTouchStart = function onTouchStart(event) {
          var touches = event.getTouches();
          if (touches.length >= 2) {
            var touch1 = touches[0];
            var touch2 = touches[1];
            var delta = touch1.getLocation().subtract(touch2.getLocation());
            this.startDistance = delta.length();
            this.startScale.set(this.targetNode.scale);
          }
          event.preventSwallow = true;
        };
        _proto.onTouchMove = function onTouchMove(event) {
          var touches = event.getTouches();
          if (touches.length >= 2) {
            var touch1 = touches[0];
            var touch2 = touches[1];
            var delta = touch1.getLocation().subtract(touch2.getLocation());
            var currentDistance = delta.length();
            if (this.startDistance == 0) {
              this.startScale = this.targetNode.scale.clone();
              this.startDistance = currentDistance;
            }
            var scaleFactor = currentDistance / this.startDistance;
            var newScale = this.startScale.clone().multiplyScalar(scaleFactor);
            if (newScale.x > 1.5) newScale.set(1.5, 1.5, 1.5);else if (newScale.x < 0.8) newScale.set(0.8, 0.8, 0.8);
            this.targetNode.scale = newScale;
            this.targetNode.getComponent(UITransform).setContentSize(this.srcSize.width * newScale.x, this.srcSize.height * newScale.y);
            GlobalEventManager.getInstance().emit(UIEvent.NodeScaleChange);
          }
          event.preventSwallow = true;
        };
        _proto.onTouchEnd = function onTouchEnd(event) {
          this.startDistance = 0;
          if (this.targetNode.scale.x < this.originalScale.x) {
            tween(this.targetNode).to(0.2, {
              scale: this.originalScale
            }).call(function () {
              GlobalEventManager.getInstance().emit(UIEvent.NodeScaleChange, true);
            }).start();
            this.targetNode.getComponent(UITransform).setContentSize(this.srcSize);
          }
          event.preventSwallow = true;
        };
        return GestureScaling;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GlobalConfig.ts", ['cc', './GlobalEventManager.ts'], function (exports) {
  var cclegacy, GlobalEventManager;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GlobalEventManager = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "775d1EbknxJgrmYJ7K8o40O", "GlobalConfig", undefined);

      //框架默认的场景
      var DefaultScene = exports('DefaultScene', /*#__PURE__*/function (DefaultScene) {
        DefaultScene["Lobby"] = "Lobby";
        DefaultScene["Game"] = "Game";
        return DefaultScene;
      }({}));
      var GlobalEvent = exports('GlobalEvent', /*#__PURE__*/function (GlobalEvent) {
        GlobalEvent["Preloaded"] = "PreloadedEvent";
        GlobalEvent["AddPreload"] = "AddPreloadEvent";
        GlobalEvent["FloatingTip"] = "FloatingTipEvent";
        GlobalEvent["BlockInput"] = "BlockInputEvent";
        GlobalEvent["AudioPreloaded"] = "AudioPreloadedEvent";
        GlobalEvent["RedPointNotify"] = "RedPointNotifyEvent";
        GlobalEvent["AutoReleaseBundle"] = "AutoReleaseBundleEvent";
        GlobalEvent["AddViewInCanvas"] = "AddViewInCanvasEvent";
        GlobalEvent["OnViewEnable"] = "OnViewEnableEvent";
        return GlobalEvent;
      }({}));
      var GlobalInputEvent = exports('GlobalInputEvent', /*#__PURE__*/function (GlobalInputEvent) {
        GlobalInputEvent["TouchStart"] = "CustomTouchStartEvent";
        GlobalInputEvent["TouchMove"] = "CustomTouchMoveEvent";
        GlobalInputEvent["TouchEnd"] = "CustomTouchEndEvent";
        GlobalInputEvent["TouchCancel"] = "CustomTouchCancelEvent";
        return GlobalInputEvent;
      }({}));
      var GlobalViewDef = exports('GlobalViewDef', /*#__PURE__*/function (GlobalViewDef) {
        GlobalViewDef["FreeVitView"] = "FreeVitView";
        GlobalViewDef["UnlimitedVitView"] = "UnlimitedVitView";
        GlobalViewDef["SettingView"] = "SettingView";
        GlobalViewDef["FloatingView"] = "FloatingView";
        GlobalViewDef["BlockInputView"] = "BlockInputView";
        return GlobalViewDef;
      }({}));
      var GlobalConstant = exports('GlobalConstant', /*#__PURE__*/function () {
        function GlobalConstant() {}
        GlobalConstant.showFloatingTip = function showFloatingTip(content) {
          GlobalEventManager.getInstance().emit(GlobalEvent.FloatingTip, content);
        };
        GlobalConstant.blockInput = function blockInput(enable) {
          GlobalEventManager.getInstance().emit(GlobalEvent.BlockInput, enable);
        };
        return GlobalConstant;
      }());
      GlobalConstant.timeScale = 1;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GlobalEventManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts'], function (exports) {
  var _inheritsLoose, cclegacy, isValid, Singleton;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      isValid = module.isValid;
    }, function (module) {
      Singleton = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "75b65pknshEQKEaK+GFkyUG", "GlobalEventManager", undefined);
      var GlobalEventManager = exports('default', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(GlobalEventManager, _Singleton);
        function GlobalEventManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this._events = {};
          return _this;
        }
        var _proto = GlobalEventManager.prototype;
        _proto.on = function on(eventname, callback, target) {
          if (this._events[eventname] == undefined) {
            this._events[eventname] = [];
          }
          this._events[eventname].push({
            callback: callback,
            target: target
          });
        };
        _proto.off = function off(eventname, callback, target) {
          var handlers = this._events[eventname];
          for (var index = handlers.length - 1; index >= 0; index--) {
            var handler = handlers[index];
            if (target == handler.target && callback.toString() == handler.callback.toString()) {
              handlers.splice(index, 1);
              break;
            }
          }
          if (handlers.length == 0) {
            delete this._events[eventname];
          }
        };
        _proto.emit = function emit(eventname) {
          var handlers = this._events[eventname];
          if (handlers != undefined && handlers != null) {
            //自动回收无效对象，如果是未继承cocos类的基类则需要自行注销
            for (var i = handlers.length - 1; i >= 0; i--) {
              var _handler = handlers[i];
              if (!isValid(_handler.target, true)) {
                handlers.splice(i, 1);
              }
            }
            for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              params[_key2 - 1] = arguments[_key2];
            }
            for (var i = 0; i < handlers.length; i++) {
              var _handler$callback;
              var handler = handlers[i];
              (_handler$callback = handler.callback).call.apply(_handler$callback, [handler.target].concat(params));
            }
          }
        };
        _proto.clear = function clear(node) {
          for (var k in this._events) {
            var handlers = this._events[k];
            if (handlers) {
              var i = 0;
              while (i < handlers.length) {
                if (handlers[i].target == node) {
                  handlers[i] = null;
                  handlers.splice(i, 1);
                  i--;
                }
                i++;
              }
              if (handlers.length == 0) delete this._events[k];
            }
          }
        };
        return GlobalEventManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GraphicsComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Color, Graphics, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Graphics = module.Graphics;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "72ec92vvnBAlqWgxUiSTkwS", "GraphicsComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var GraphicsComponent = exports('default', (_dec = menu("1-UI/GraphicsComponent"), _dec2 = property(Color), _dec3 = property(Color), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GraphicsComponent, _Component);
        function GraphicsComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "lineWidth", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "strokeColor", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fillColor", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = GraphicsComponent.prototype;
        _proto.drawPolygon = function drawPolygon(points) {
          var graphics = this.node.getComponent(Graphics);
          if (!graphics) {
            graphics = this.node.addComponent(Graphics);
          }
          graphics.clear();
          graphics.lineWidth = this.lineWidth;
          graphics.strokeColor = this.strokeColor;
          graphics.fillColor = this.fillColor;
          graphics.moveTo(points[0].x, points[0].y);
          for (var i = 1; i < points.length; i++) {
            graphics.lineTo(points[i].x, points[i].y);
          }
          graphics.close();
          graphics.stroke();
          graphics.fill();
        };
        _proto.drawCircle = function drawCircle(center, radius) {
          var graphics = this.node.getComponent(Graphics);
          if (!graphics) {
            graphics = this.node.addComponent(Graphics);
          }
          graphics.clear();
          graphics.lineWidth = this.lineWidth;
          graphics.strokeColor = this.strokeColor;
          graphics.fillColor = this.fillColor;
          graphics.circle(center.x, center.y, radius);
          graphics.stroke();
          graphics.fill();
        };
        _proto.clear = function clear() {
          var graphics = this.node.getComponent(Graphics);
          if (graphics) {
            graphics.clear();
          }
        };
        return GraphicsComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lineWidth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "strokeColor", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fillColor", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.TRANSPARENT;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Handler.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "59d077QZU1DI4YgOk/NZHRT", "Handler", undefined);
      var Handler = exports('default', /*#__PURE__*/function () {
        function Handler(_call, _caller) {
          this.call = void 0;
          this.caller = void 0;
          this.call = _call;
          this.caller = _caller;
        }
        var _proto = Handler.prototype;
        _proto.invoke = function invoke() {
          var _this$call;
          for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
          }
          this.caller ? (_this$call = this.call).call.apply(_this$call, [this.caller].concat(params)) : this.call.apply(this, params);
        };
        return Handler;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Handlers.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ae3a9q4d5dE76Smknr/okCE", "Handlers", undefined);
      var Handlers = exports('Handlers', /*#__PURE__*/function () {
        function Handlers() {
          this.handlers = [];
        }
        var _proto = Handlers.prototype;
        _proto.add = function add(func) {
          this.handlers.push(func);
        };
        _proto.remove = function remove(func) {
          var index = this.handlers.findIndex(function (t) {
            return t.toString() === func.toString();
          });
          if (index >= 0) this.handlers.splice(index, 1);
        };
        _proto.clear = function clear() {
          this.handlers = [];
        };
        _proto.emit = function emit() {
          for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
          }
          this.handlers.forEach(function (func) {
            return func.apply(void 0, params);
          });
        };
        return Handlers;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeartBeatHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ac005UUP61PQZtTpOUcQFy4", "HeartBeatHandler", undefined);
      var HeartBeatHandler = exports('HeartBeatHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(HeartBeatHandler, _NetWorkHandler);
        function HeartBeatHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = HeartBeatHandler.prototype;
        _proto.onHandler = function onHandler() {
          // console.log("HeartBeatHandler!!", this.data);
        };
        return HeartBeatHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IntrusionHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GameDataManager, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "762eaEzi3hBQb91VZ8uMFsV", "IntrusionHandler", undefined);
      var IntrusionHandler = exports('IntrusionHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(IntrusionHandler, _NetWorkHandler);
        function IntrusionHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = IntrusionHandler.prototype;
        _proto.onHandler = function onHandler() {
          var _this$data;
          console.log("IntrusionHandler!!", this.data);
          if ((_this$data = this.data) != null && _this$data.goldCount) {
            GameDataManager.getInstance().invasionGold.set(this.data.goldCount);
            this.data.goldCount = 0;
          }
        };
        return IntrusionHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InvasionView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameNetRequest.ts', './GameDataManager.ts', './AirBoatAnimation.ts', './GameLocalData.ts', './SpriteFrameComponent.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, log, Component, GameNetRequest, GameDataManager, AirBoatAnimation, GameLocalData, SpriteFrameComponent, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      log = module.log;
      Component = module.Component;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      AirBoatAnimation = module.AirBoatAnimation;
    }, function (module) {
      GameLocalData = module.default;
    }, function (module) {
      SpriteFrameComponent = module.default;
    }, function (module) {
      Utils = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "ad56aXpyn1KvbCfxOTlQA2r", "InvasionView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var InvasionView = exports('InvasionView', (_dec = ccclass('InvasionView'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(SpriteFrameComponent), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(InvasionView, _Component);
        function InvasionView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "aimRootNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vfxRootNode", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "settleLayer", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelReward", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelTargetNick", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelMulti", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "flagMulti", _descriptor7, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = InvasionView.prototype;
        _proto.start = function start() {
          GameDataManager.getInstance().invasionGold.addChangeListener(this.onInvasionRewardListener, this);
          GameDataManager.getInstance().invasionVfxState.addChangeListener(this.onShowSettle, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().invasionGold.removeChangeListener(this.onInvasionRewardListener, this);
          GameDataManager.getInstance().invasionVfxState.removeChangeListener(this.onShowSettle, this);
        };
        _proto.onEnable = function onEnable() {
          this.aimRootNode.active = true;
          this.settleLayer.active = false;
          this.labelMulti.string = "X" + GameLocalData.instance.data.multi.cur;
          this.labelTargetNick.string = GameDataManager.getInstance().invasionTargetNick + "'s Tower";
          var index = GameLocalData.instance.getIndex();
          var flagIndex = 0;
          if (index >= 0 && index <= 2) {
            flagIndex = 0;
          } else if (index >= 3 && index <= 5) {
            flagIndex = 1;
          } else {
            flagIndex = 2;
          }
          this.flagMulti.setFrameByIndex(flagIndex);
        };
        _proto.update = function update(deltaTime) {};
        _proto.onShowSettle = function onShowSettle(value) {
          if (value) {
            this.settleLayer.active = true;
            GameDataManager.getInstance().invasionVfxState.cur = 0;
          }
        };
        _proto.onInvasionRewardListener = function onInvasionRewardListener(value) {
          this.labelReward.string = Utils.toThousands(value);
        };
        _proto.onClickAttackPos = function onClickAttackPos(event, index) {
          var posId = Number(index);
          log("", GameDataManager.getInstance().invasionTarget, posId);
          GameNetRequest.intrusion(GameDataManager.getInstance().invasionTarget, posId);
          var aim = this.aimRootNode.children[posId - 1];
          new AirBoatAnimation(aim.position.clone().add3f(-200, 1000, 0), this.vfxRootNode);
          this.aimRootNode.active = false;
        };
        return InvasionView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "aimRootNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "vfxRootNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "settleLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "labelReward", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelTargetNick", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "labelMulti", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "flagMulti", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Joystick.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './JoystickEnum.ts', './GlobalEventManager.ts', './GlobalConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, v3, UITransform, UIOpacity, Vec3, Component, JoystickEnum, GlobalEventManager, GlobalInputEvent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      v3 = module.v3;
      UITransform = module.UITransform;
      UIOpacity = module.UIOpacity;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      JoystickEnum = module.default;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalInputEvent = module.GlobalInputEvent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "dd280wmme1DjJ/LCPtn4CsV", "Joystick", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var Joystick = exports('default', (_dec = menu("1-Input/Joystick"), _dec2 = property({
        type: Node,
        displayName: 'Stick',
        tooltip: '摇杆'
      }), _dec3 = property({
        type: Node,
        displayName: 'Bg',
        tooltip: '摇杆背景'
      }), _dec4 = property({
        type: JoystickEnum.JoystickType,
        displayName: 'Touch Type',
        tooltip: '触摸类型'
      }), _dec5 = property({
        type: JoystickEnum.DirectionType,
        displayName: 'Direction Type',
        tooltip: '方向类型'
      }), _dec6 = property({
        tooltip: '摇杆有效半径'
      }), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Joystick, _Component);
        function Joystick() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "stick", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "joystickType", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "directionType", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "validRadius", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isSwallowTouch", _descriptor6, _assertThisInitialized(_this));
          _this._stickPos = v3();
          _this._touchLocation = null;
          _this._radius = void 0;
          _this._touched = false;
          _this._srcPos = null;
          return _this;
        }
        var _proto = Joystick.prototype;
        _proto.onLoad = function onLoad() {
          this._radius = this.bg.getComponent(UITransform).contentSize.width / 2;
          // hide joystick when follow
          if (this.joystickType === JoystickEnum.JoystickType.FOLLOW) {
            this.node.getComponent(UIOpacity).opacity = 0;
          }
        };
        _proto.start = function start() {
          this._initTouchEvent();
          if (!this.isSwallowTouch) {
            this.node["_touchListener"].setSwallowTouches(false);
          }
          this._srcPos = v3(this.bg.position);
        };
        _proto.onEnable = function onEnable() {
          GlobalEventManager.getInstance().on(JoystickEnum.EventType.CHANGE_JOYSTICK_TYPE, this._onChangeJoystickType, this);
          GlobalEventManager.getInstance().on(JoystickEnum.EventType.INTERRUPT_JOYSTICK_INPUT, this._touchEndEvent, this);
          GlobalEventManager.getInstance().on(JoystickEnum.EventType.ENABLE_JOYSTICK, this._onEnableJoystick, this);
        };
        _proto.onDisable = function onDisable() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto._onEnableJoystick = function _onEnableJoystick(enable) {
          this.node.off(Node.EventType.TOUCH_START, this._touchStartEvent, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
          this.node.off(Node.EventType.TOUCH_END, this._touchEndEvent, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
          if (enable) {
            this._initTouchEvent();
            if (!this.isSwallowTouch) {
              this.node["_touchListener"].setSwallowTouches(false);
            }
          }
          this.bg.active = enable;
          this.stick.active = enable;
        };
        _proto._onChangeJoystickType = function _onChangeJoystickType(type) {
          this.joystickType = type;
          this.node.getComponent(UIOpacity).opacity = type === JoystickEnum.JoystickType.FOLLOW ? 0 : 255;
        };
        _proto._initTouchEvent = function _initTouchEvent() {
          this.node.on(Node.EventType.TOUCH_START, this._touchStartEvent, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
          this.node.on(Node.EventType.TOUCH_END, this._touchEndEvent, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
        };
        _proto._touchStartEvent = function _touchStartEvent(event) {
          this._touched = true;
          var touchPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(v3(event.getUILocation().x, event.getUILocation().y));
          var p = null;
          if (this.joystickType === JoystickEnum.JoystickType.FIXED) {
            this._stickPos.set(this.bg.position);
            p = v3(touchPos).subtract(this.bg.position).normalize();

            // 触摸点与圆圈中心的距离
            var distance = Vec3.distance(touchPos, this.bg.position);

            // 手指在圆圈内触摸,控杆跟随触摸点
            if (this._radius > distance) {
              if (this.directionType == JoystickEnum.DirectionType.TWO) touchPos.y = this._stickPos.y;
              this.stick.setPosition(touchPos);
            } else {
              // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
              var x = this._stickPos.x + p.x * this._radius;
              var y = this._stickPos.y + p.y * this._radius;
              if (this.directionType == JoystickEnum.DirectionType.TWO) this.stick.setPosition(v3(x, this.bg.position.y));else this.stick.setPosition(v3(x, y));
            }
            if (distance < this.validRadius) {
              p.x = 0;
              p.y = 0;
            }
          } else if (this.joystickType === JoystickEnum.JoystickType.FOLLOW || this.joystickType === JoystickEnum.JoystickType.FIXED_FOLLOW) {
            // 记录摇杆位置，给 touch move 使用
            this._stickPos.set(touchPos);
            this.node.getComponent(UIOpacity).opacity = 255;
            this._touchLocation = event.getLocation();
            p = Vec3.ZERO;

            // 更改摇杆的位置
            this.bg.setPosition(v3(touchPos.x, touchPos.y));
            if (this.directionType == JoystickEnum.DirectionType.TWO) touchPos.y = this.bg.position.y;
            this.stick.setPosition(v3(touchPos.x, touchPos.y));
          }
          GlobalEventManager.getInstance().emit(GlobalInputEvent.TouchStart, event, p, this.joystickType);
        };
        _proto._touchMoveEvent = function _touchMoveEvent(event) {
          if (!this._touched) return;
          // 如果 touch start 位置和 touch move 相同，禁止移动
          if (this._touchLocation === event.getLocation()) {
            return false;
          }

          // 以圆圈为锚点获取触摸坐标
          var touchPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(v3(event.getUILocation().x, event.getUILocation().y));
          var distance = Vec3.distance(touchPos, this.bg.position);

          // 归一化
          var p = v3(touchPos.x, touchPos.y).subtract(this.bg.position).normalize();
          var speedType;
          if (this._radius > distance) {
            if (this.directionType == JoystickEnum.DirectionType.TWO) this.stick.setPosition(v3(touchPos.x, this._stickPos.y));else this.stick.setPosition(v3(touchPos.x, touchPos.y));
            speedType = JoystickEnum.SpeedType.NORMAL;
          } else {
            // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
            var x = this._stickPos.x + p.x * this._radius;
            var y = this._stickPos.y + p.y * this._radius;
            if (this.directionType == JoystickEnum.DirectionType.TWO) this.stick.setPosition(v3(x, this._stickPos.y));else this.stick.setPosition(v3(x, y));
            speedType = JoystickEnum.SpeedType.FAST;
          }
          if (distance < this.validRadius) {
            p.x = 0;
            p.y = 0;
          }
          GlobalEventManager.getInstance().emit(GlobalInputEvent.TouchMove, event, p, this.joystickType, speedType);
        };
        _proto._touchEndEvent = function _touchEndEvent(event) {
          this._touched = false;
          if (this.joystickType === JoystickEnum.JoystickType.FOLLOW) {
            this.node.getComponent(UIOpacity).opacity = 0;
          } else if (this.joystickType === JoystickEnum.JoystickType.FIXED_FOLLOW) {
            this.bg.setPosition(this._srcPos);
          }
          this.stick.setPosition(this.bg.getPosition());
          GlobalEventManager.getInstance().emit(GlobalInputEvent.TouchEnd, event, Vec3.ZERO, this.joystickType, JoystickEnum.SpeedType.STOP);
        };
        return Joystick;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "stick", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "joystickType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return JoystickEnum.JoystickType.FIXED;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "directionType", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return JoystickEnum.DirectionType.ALL;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "validRadius", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isSwallowTouch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JoystickEnum.ts", ['cc'], function (exports) {
  var Enum, cclegacy;
  return {
    setters: [function (module) {
      Enum = module.Enum;
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "40a1cTOri9NrZEhPS8WzfJa", "JoystickEnum", undefined);
      var JoystickEnum = exports('default', {
        JoystickType: Enum({
          FIXED: 0,
          FOLLOW: 1,
          FIXED_FOLLOW: 2
        }),
        DirectionType: Enum({
          TWO: 2,
          ALL: 0
        }),
        SpeedType: Enum({
          STOP: 0,
          NORMAL: 1,
          FAST: 2
        }),
        EventType: Enum({
          CHANGE_JOYSTICK_TYPE: "changeJoystickType",
          INTERRUPT_JOYSTICK_INPUT: "interruptJoystickInput",
          ENABLE_JOYSTICK: "ENABLE_JOYSTICK"
        })
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/KeyboardCenter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './GlobalConfig.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, input, Input, KeyCode, v2, Component, GlobalEventManager, GlobalInputEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      v2 = module.v2;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalInputEvent = module.GlobalInputEvent;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "092a7HlhlJFjbgNU3hZpRr+", "KeyboardCenter", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var KeyboardCenter = exports('default', (_dec = menu("1-Input/KeyboardCenter"), ccclass(_class = _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(KeyboardCenter, _Component);
        function KeyboardCenter() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.vect = v2();
          _this.keymap = [];
          return _this;
        }
        var _proto = KeyboardCenter.prototype;
        _proto.onLoad = function onLoad() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        };
        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        };
        _proto.onKeyDown = function onKeyDown(event) {
          switch (event.keyCode) {
            case KeyCode.KEY_A:
              this.vect.x = -1;
              break;
            case KeyCode.KEY_D:
              this.vect.x = 1;
              break;
            case KeyCode.KEY_W:
              this.vect.y = 1;
              break;
            case KeyCode.KEY_S:
              this.vect.y = -1;
              break;
            default:
              return;
          }
          if (this.keymap.indexOf(event.keyCode) >= 0) {
            GlobalEventManager.getInstance().emit(GlobalInputEvent.TouchMove, event, this.vect);
          } else {
            this.keymap.push(event.keyCode);
            GlobalEventManager.getInstance().emit(GlobalInputEvent.TouchStart, event, this.vect);
          }
        };
        _proto.onKeyUp = function onKeyUp(event) {
          this.keymap.splice(this.keymap.indexOf(event.keyCode), 1);
          switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
              if (this.keymap.indexOf(KeyCode.KEY_A) < 0 && this.keymap.indexOf(KeyCode.KEY_D) < 0) this.vect.x = 0;
              break;
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
              if (this.keymap.indexOf(KeyCode.KEY_A) < 0 && this.keymap.indexOf(KeyCode.KEY_D) < 0) this.vect.y = 0;
              break;
            default:
              return;
          }
          GlobalEventManager.getInstance().emit(GlobalInputEvent.TouchEnd, event, this.vect);
        };
        return KeyboardCenter;
      }(Component)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerDiceNum.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Sprite, Component, GameDataManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "c50d1vV4L1LE7UAnoAznDUx", "LayerDiceNum", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LayerDiceNum = exports('LayerDiceNum', (_dec = ccclass('LayerDiceNum'), _dec2 = property(Label), _dec3 = property(Sprite), _dec4 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LayerDiceNum, _Component);
        function LayerDiceNum() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labelDiceNum", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spProgress", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelTick", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = LayerDiceNum.prototype;
        _proto.start = function start() {
          this.onDiceNumUpdate();
          GameDataManager.getInstance().data.dice.addChangeListener(this.onDiceNumUpdate, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().data.dice.removeChangeListener(this.onDiceNumUpdate, this);
        };
        _proto.onDiceNumUpdate = function onDiceNumUpdate() {
          this.labelDiceNum.string = GameDataManager.getInstance().data.dice.cur + "/" + GameDataManager.getInstance().diceMax;
          this.spProgress.fillRange = GameDataManager.getInstance().data.dice.cur / GameDataManager.getInstance().diceMax;
          this.labelTick.node.active = GameDataManager.getInstance().data.dice.cur < GameDataManager.getInstance().diceMax;
        };
        return LayerDiceNum;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelDiceNum", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spProgress", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labelTick", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LineFloorInfo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, tween, UIOpacity, Component, GlobalEventManager, GameEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "0119eQjj0tEa7YKrop6xlcX", "LineFloorInfo", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LineFloorInfo = exports('LineFloorInfo', (_dec = ccclass('LineFloorInfo'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LineFloorInfo, _Component);
        function LineFloorInfo() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = LineFloorInfo.prototype;
        _proto.start = function start() {
          GlobalEventManager.getInstance().on(GameEvent.BuildingEffect, this.onBuildingEffectListener, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().off(GameEvent.BuildingEffect, this.onBuildingEffectListener, this);
        };
        _proto.onBuildingEffectListener = function onBuildingEffectListener() {
          tween(this.node.getComponent(UIOpacity)).to(0.2, {
            opacity: 0
          }).delay(2).to(0.2, {
            opacity: 255
          }).start();
        };
        return LineFloorInfo;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ListViewComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Prefab, Vec2, ScrollView, NodePool, UITransform, v2, instantiate, Component, v3, rect;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      Vec2 = module.Vec2;
      ScrollView = module.ScrollView;
      NodePool = module.NodePool;
      UITransform = module.UITransform;
      v2 = module.v2;
      instantiate = module.instantiate;
      Component = module.Component;
      v3 = module.v3;
      rect = module.rect;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class3, _class4, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "de72fa/K8hJrZT95ybs7dBn", "ListViewComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      /**
       * 通用 ListView 组件.
       * 能够显示垂直/横向ListView. 具体用法见Demo
       */
      var ListViewComponent = exports('default', (_dec = menu("1-UI/ListViewComponent"), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Vec2), _dec5 = property({
        tooltip: '四周边距'
      }), _dec6 = property({
        tooltip: '比可见元素多缓存2个, 缓存越多,快速滑动越流畅,但同时初始化越慢.'
      }), _dec7 = property({
        tooltip: '行列数，横向滚动是行数，竖向滚动是列数.'
      }), _dec8 = property(ScrollView), _dec9 = property(Node), ccclass(_class3 = _dec(_class3 = (_class4 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ListViewComponent, _Component);
        function ListViewComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "itemTemplate", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemPrefabTemplate", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spacing", _descriptor3, _assertThisInitialized(_this));
          // 四周距离.
          _initializerDefineProperty(_this, "margin", _descriptor4, _assertThisInitialized(_this));
          // 比可见元素多缓存2个, 缓存越多,快速滑动越流畅,但同时初始化越慢.
          _initializerDefineProperty(_this, "spawnCount", _descriptor5, _assertThisInitialized(_this));
          // 横向布局的item 数量. 默认为1,即每行一个元素.
          _initializerDefineProperty(_this, "column", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scrollView", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "emptyView", _descriptor8, _assertThisInitialized(_this));
          _this.content = null;
          _this.adapter = null;
          _this._items = new NodePool();
          // 记录当前填充在树上的索引. 用来快速查找哪些位置缺少item了.
          _this._filledIds = {};
          _this.horizontal = false;
          // 初始时即计算item的高度.因为布局时要用到.
          _this._itemHeight = 1;
          _this._itemWidth = 1;
          _this._itemsVisible = 1;
          _this.dataChanged = false;
          _this._isInited = false;
          // 当前屏幕可见元素索引值.
          _this.visibleRange = [-1, -1];
          _this.pager = void 0;
          _this.comp = null;
          return _this;
        }
        var _proto3 = ListViewComponent.prototype;
        _proto3.onLoad = function onLoad() {
          if (this.itemTemplate != null && this.itemTemplate.active) this.itemTemplate.active = false;
          this.init();

          // @ts-ignore
          this.pager = new Pager(this);
          /**
           *  如果出现列表显示异常,如边界留白,item 错位等问题,可能是所在节点树 存在缩放行为.
           *  具体bug参考: https://forum.cocos.com/t/v2-1-0-scrollview/71260/5
           *  打开以下代码即可解决布局异常问题.
           */
          if (this.scrollView) ;
        };
        _proto3.setAdapter = /*#__PURE__*/function () {
          var _setAdapter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(adapter) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.adapter === adapter)) {
                    _context.next = 3;
                    break;
                  }
                  this.notifyUpdate();
                  return _context.abrupt("return");
                case 3:
                  adapter.listview = this;
                  this.adapter = adapter;
                  if (!(this.adapter == null)) {
                    _context.next = 8;
                    break;
                  }
                  console.warn("adapter 为空.");
                  return _context.abrupt("return");
                case 8:
                  if (!(this.itemTemplate == null && this.itemPrefabTemplate == null)) {
                    _context.next = 11;
                    break;
                  }
                  console.error("Listview 未设置待显示的Item模板.");
                  return _context.abrupt("return");
                case 11:
                  this.visibleRange[0] = this.visibleRange[1] = -1;
                  this.recycleAll();
                  this.notifyUpdate();
                case 14:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function setAdapter(_x) {
            return _setAdapter.apply(this, arguments);
          }
          return setAdapter;
        }();
        _proto3.getAdapter = function getAdapter() {
          return this.adapter;
        };
        _proto3.getScrollView = function getScrollView() {
          return this.scrollView;
        };
        _proto3.getAllItems = function getAllItems() {
          return this._items;
        };
        _proto3.refreshAdapter = function refreshAdapter(adapter) {
          this.adapter = adapter ? adapter : this.adapter;
          this.visibleRange[0] = this.visibleRange[1] = -1;
          this.recycleAll();
          this.notifyUpdate();
        }

        /**
         * 滚动API
         * @param pageIndex 滚动到哪一页.
         * @param pageCount 如果>0 则以count数量的item 为一页.否则以当前可见数量为一页.
         * @param timeSecond
         * @return true = 滚动到最后一页了.
         */;
        _proto3.scrollToPage = function scrollToPage(pageIndex, pageCount, timeSecond) {
          if (!this.adapter || !this.scrollView) {
            return false;
          }
          var count = this.adapter.getCount() || 1;
          //this.column = this.column || 1;
          if (this.horizontal) {
            var pageWidth = 0;
            var maxWidth = this.content.getComponent(UITransform).width;
            var columnWidth = this.getColumnWH();
            if (!pageCount) {
              // 可见区域的总宽度. 还需要进一步缩减为整数个item的区域.
              var pW = this.content.parent.getComponent(UITransform).width;
              pageWidth = Math.floor(pW / columnWidth) * columnWidth;
            } else {
              pageWidth = columnWidth * pageCount;
            }
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToOffset(v2(pageWidth * pageIndex, 0), timeSecond);
            return pageWidth * (pageIndex + 1) >= maxWidth;
          } else {
            var maxHeight = this.content.getComponent(UITransform).height;
            var rowHeight = this.getColumnWH();
            var pageHeight = 0;
            if (!pageCount) {
              // maskView 的高度.
              var pH = this.content.parent.getComponent(UITransform).height;
              pageHeight = Math.floor(pH / rowHeight) * rowHeight;
            } else {
              pageHeight = rowHeight * pageCount;
            }
            this.scrollView.stopAutoScroll();
            this.scrollView.scrollToOffset(v2(0, pageHeight * pageIndex), timeSecond);
            return pageHeight * (pageIndex + 1) >= maxHeight;
          }
        }

        // 获取可见区域的最大元素个数。不包含遮挡一半的元素。
        ;

        _proto3.getVisibleElements = function getVisibleElements() {
          var visibleCount = 0;
          // const count = this.adapter ? (this.adapter.getCount() || 1) : 1;
          if (this.horizontal) {
            // 可见区域的总宽度. 还需要进一步缩减为整数个item的区域.
            var pW = this.content.parent.getComponent(UITransform).width;
            visibleCount = Math.floor(pW / this.getColumnWH());
          } else {
            // maskView 的高度.
            var pH = this.content.parent.getComponent(UITransform).height;
            visibleCount = Math.floor(pH / this.getColumnWH());
          }
          return visibleCount * this.column;
        };
        _proto3.getColumnWH = function getColumnWH() {
          if (this.horizontal) {
            return this._itemWidth + this.spacing.x;
          } else {
            return this._itemHeight + this.spacing.y;
          }
        }

        // 数据变更了需要进行更新UI显示, 可只更新某一条.
        ;

        _proto3.notifyUpdate = function notifyUpdate() {
          if (this.adapter == null) {
            return;
          }
          if (!this.scrollView || !this.content) {
            return;
          }
          if (this.emptyView) {
            this.emptyView.active = this.adapter.getCount() > 0 ? false : true;
          }
          this.visibleRange[0] = this.visibleRange[1] = -1;
          if (this.horizontal) {
            this.content.getComponent(UITransform).width = Math.ceil(this.adapter.getCount() / this.column) * (this._itemWidth + this.spacing.x) - this.spacing.x + this.margin.x + this.margin.width;
          } else {
            this.content.getComponent(UITransform).height = Math.ceil(this.adapter.getCount() / this.column) * (this._itemHeight + this.spacing.y) - this.spacing.y + this.margin.y + this.margin.height;
          }
          this.dataChanged = true;
        };
        _proto3.lateUpdate = function lateUpdate() {
          var range = this.getVisibleRange();
          if (!this.checkNeedUpdate(range)) {
            return;
          }
          this.recycleDirty(range);
          this.updateView(range);
        }

        // 向某位置添加一个item.
        ;

        _proto3._layoutVertical = function _layoutVertical(child, posIndex) {
          this.content.addChild(child);
          // 当columns 大于1时,从左到右依次排列, 否则进行居中排列.
          var column = posIndex % (this.column || 1);
          var row = Math.floor(posIndex / (this.column || 1));
          child.setPosition(this.column > 1 ? this.margin.x + child.getComponent(UITransform).width * child.getComponent(UITransform).anchorX + (child.getComponent(UITransform).width + this.spacing.x) * column - this.content.getComponent(UITransform).width * this.content.getComponent(UITransform).anchorX : 0, -this.margin.y - child.getComponent(UITransform).height * (child.getComponent(UITransform).anchorY + row) - this.spacing.y * row);
        }

        // 向某位置添加一个item.
        ;

        _proto3._layoutHorizontal = function _layoutHorizontal(child, posIndex) {
          this.content.addChild(child);
          var row = posIndex % (this.column || 1);
          var column = Math.floor(posIndex / (this.column || 1));
          var direction = -1; // -1 由上到下排列, 1= 由下往上排
          child.setPosition(child.getComponent(UITransform).width * (child.getComponent(UITransform).anchorX + column) + this.spacing.x * column + this.margin.x, this.column > 1 ? direction * (this.margin.y + child.getComponent(UITransform).height * child.getComponent(UITransform).anchorY + (child.getComponent(UITransform).height + this.spacing.y) * row - this.content.getComponent(UITransform).height * this.content.getComponent(UITransform).anchorY) : 0);
        };
        _proto3.recycleAll = function recycleAll() {
          for (var child in this._filledIds) {
            if (this._filledIds.hasOwnProperty(child)) {
              this._items.put(this._filledIds[child]);
            }
          }
          this._filledIds = {};
        };
        _proto3.recycleDirty = function recycleDirty(visibleRange) {
          if (!visibleRange || visibleRange.length < 2) {
            return;
          }
          for (var i = this.visibleRange[0]; i < visibleRange[0]; i++) {
            if (i < 0 || !this._filledIds[i]) {
              continue;
            }
            this._items.put(this._filledIds[i]);
            this._filledIds[i] = null;
          }
          for (var j = this.visibleRange[1]; j > visibleRange[1]; j--) {
            if (j < 0 || !this._filledIds[j]) {
              continue;
            }
            this._items.put(this._filledIds[j]);
            this._filledIds[j] = null;
          }
          this.visibleRange[0] = visibleRange[0];
          this.visibleRange[1] = visibleRange[1];
        };
        _proto3.checkNeedUpdate = function checkNeedUpdate(visibleRange) {
          return visibleRange && this.visibleRange && (this.visibleRange[0] != visibleRange[0] || this.visibleRange[1] != visibleRange[1]);
        }

        // 填充View.
        ;

        _proto3.updateView = function updateView(visibleRange) {
          for (var i = visibleRange[0]; i <= visibleRange[1]; i++) {
            if (!this.dataChanged) {
              if (this._filledIds[i]) {
                continue;
              }
            }
            var child = this._filledIds[i] || this._items.get() || instantiate(this.itemTemplate) || instantiate(this.itemPrefabTemplate);
            child.active = true;
            if (this.comp && !(child.getComponent(Component) instanceof this.comp)) {
              child.getComponent(Component).destroy();
              child.addComponent(this.comp);
            }
            child.removeFromParent();
            this.horizontal ? this._layoutHorizontal(child, i) : this._layoutVertical(child, i);
            this._filledIds[i] = this.adapter._getView(child, i);
          }
          this.dataChanged = false;
        }

        // 获取当前屏幕可见元素索引.
        ;

        _proto3.getVisibleRange = function getVisibleRange() {
          if (this.adapter == null) {
            return null;
          }
          var scrollOffset = this.scrollView.getScrollOffset();
          var startIndex = 0;
          if (this.horizontal) {
            startIndex = Math.floor(-scrollOffset.x / (this._itemWidth + this.spacing.x));
          } else {
            startIndex = Math.floor(scrollOffset.y / (this._itemHeight + this.spacing.y));
          }
          if (startIndex < 0) {
            startIndex = 0;
          }
          var visible = this.column * (startIndex + this._itemsVisible + this.spawnCount);
          if (visible >= this.adapter.getCount()) {
            visible = this.adapter.getCount() - 1;
          }
          return [startIndex * this.column, visible];
        };
        _proto3.init = function init() {
          if (this._isInited) {
            return;
          }
          this._isInited = true;
          if (this.scrollView) {
            this.content = this.scrollView.content;
            this.horizontal = this.scrollView.horizontal;
            if (this.horizontal) {
              this.scrollView.vertical = false;
              this.content.getComponent(UITransform).anchorX = 0;
              this.content.getComponent(UITransform).anchorY = this.content.parent.getComponent(UITransform).anchorY;
              this.content.setPosition(v3(-this.content.parent.getComponent(UITransform).width * this.content.parent.getComponent(UITransform).anchorX, 0));
            } else {
              this.scrollView.vertical = true;
              this.content.getComponent(UITransform).anchorX = this.content.parent.getComponent(UITransform).anchorX;
              this.content.getComponent(UITransform).anchorY = 1;
              this.content.setPosition(v3(0, this.content.parent.getComponent(UITransform).height * this.content.parent.getComponent(UITransform).anchorY));
            }
          } else {
            console.error("ListView need a scrollView for showing.");
          }
          var itemOne = this._items.get() || instantiate(this.itemTemplate) || instantiate(this.itemPrefabTemplate);
          itemOne.active = true;
          this._items.put(itemOne);
          this._itemHeight = itemOne.getComponent(UITransform).height || 10;
          this._itemWidth = itemOne.getComponent(UITransform).width || 10;
          if (this.horizontal) {
            this._itemsVisible = Math.ceil((this.content.parent.getComponent(UITransform).width - this.margin.x - this.margin.width) / (this._itemWidth + this.spacing.x));
          } else {
            this._itemsVisible = Math.ceil((this.content.parent.getComponent(UITransform).height - this.margin.y - this.margin.height) / (this._itemHeight + this.spacing.y));
          }
        };
        return ListViewComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class4.prototype, "itemTemplate", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class4.prototype, "itemPrefabTemplate", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class4.prototype, "spacing", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return v2(0, 0);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class4.prototype, "margin", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return rect(0, 0, 0, 0);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class4.prototype, "spawnCount", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class4.prototype, "column", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class4.prototype, "scrollView", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class4.prototype, "emptyView", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class4)) || _class3) || _class3));
      var Pager = exports('Pager', /*#__PURE__*/function () {
        function Pager(listView, pageOfItems) {
          if (pageOfItems === void 0) {
            pageOfItems = 0;
          }
          this.listView = null;
          // 每一页的item数量。用于控制一次滚动多少条。
          this.pageOfItems = 0;
          // 当前所在的页数位置。
          this.currentPageIndex = 0;
          // Page 变化事件。
          this.onPageChangeListener = null;
          this.isScrolling = false;
          this.listView = listView;
          this.pageOfItems = pageOfItems;
          this.listView.getScrollView().node.on('scrolling', this.onScrollingListener, this);
          this.listView.getScrollView().node.on('scroll-ended', this.onScrollEndedListener, this);
          // this.getPageCount();h
        }

        var _proto = Pager.prototype;
        _proto.onScrollingListener = function onScrollingListener() {
          this.isScrolling = true;
        };
        _proto.onScrollEndedListener = function onScrollEndedListener() {
          this.isScrolling = false;
        };
        _proto.getPageCount = function getPageCount() {
          if (!this.listView.getAdapter()) {
            return 1;
          }
          var count = this.listView.getAdapter().getCount();
          if (!this.pageOfItems) {
            this.pageOfItems = this.listView.getVisibleElements();
          }
          if (this.pageOfItems <= 0) {
            this.pageOfItems = 1;
          }
          var pages = Math.ceil(count / this.pageOfItems);
          return pages;
        };
        _proto.getCurrentPage = function getCurrentPage() {
          return this.currentPageIndex;
        };
        _proto.prePage = function prePage() {
          if (this.isScrolling) return;
          this.currentPageIndex--;
          if (this.currentPageIndex < 0) {
            this.currentPageIndex = 0;
          }
          this.isScrolling = true;
          this.listView.scrollToPage(this.currentPageIndex, 0, 0.5);
          if (this.onPageChangeListener) {
            this.onPageChangeListener(this.listView, this.currentPageIndex);
          }
        };
        _proto.nextPage = function nextPage() {
          if (this.isScrolling) return;
          this.currentPageIndex++;
          var pageCount = this.getPageCount();
          if (this.currentPageIndex > pageCount - 1) {
            this.currentPageIndex = pageCount - 1;
          }
          this.isScrolling = true;
          this.listView.scrollToPage(this.currentPageIndex, 0, 0.5);
          if (this.onPageChangeListener) {
            this.onPageChangeListener(this.listView, this.currentPageIndex);
          }
        };
        _proto.canPrePage = function canPrePage() {
          return this.currentPageIndex > 0;
        };
        _proto.canNextPage = function canNextPage() {
          return this.currentPageIndex < this.getPageCount() - 1;
        };
        _proto.setOnPageChangeListener = function setOnPageChangeListener(l) {
          this.onPageChangeListener = l;
        };
        _proto.scrollToPageByIndex = function scrollToPageByIndex(index, pageMaxNum, timeSecond) {
          this.currentPageIndex = Math.ceil(index / pageMaxNum) - 1;
          var pageCount = this.getPageCount();
          if (this.currentPageIndex > pageCount - 1) {
            this.currentPageIndex = pageCount - 1;
          } else if (this.currentPageIndex < 0) {
            this.currentPageIndex = 0;
          }
          this.listView.scrollToPage(this.currentPageIndex, 0, timeSecond);
        };
        return Pager;
      }());

      // 数据绑定的辅助适配器
      var AbsAdapter = exports('AbsAdapter', /*#__PURE__*/function () {
        function AbsAdapter() {
          this.listview = void 0;
          this.dataSet = [];
        }
        var _proto2 = AbsAdapter.prototype;
        _proto2.setDataSet = function setDataSet(data) {
          this.dataSet = data || [];
        };
        _proto2.getCount = function getCount() {
          return this.dataSet ? this.dataSet.length : 0;
        };
        _proto2.getData = function getData(posIndex) {
          return this.dataSet[posIndex];
        };
        _proto2._getView = function _getView(item, posIndex) {
          this.updateView(item, posIndex, this.dataSet[posIndex]);
          item.setSiblingIndex(posIndex);
          item.on(Node.EventType.TOUCH_END, this.onClickBase, this);
          return item;
        };
        _proto2.onClickBase = function onClickBase(event) {
          var item = event.currentTarget;
          this.onClickItem(item, this.getData(item.getSiblingIndex()), item.getSiblingIndex());
        };
        _proto2.onClickItem = function onClickItem(item, data, index) {};
        return AbsAdapter;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Loading.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalConfig.ts', './GlobalEventManager.ts', './SceneManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, DynamicAtlasManager, macro, Sprite, Label, tween, Component, GlobalEvent, DefaultScene, GlobalEventManager, SceneManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      DynamicAtlasManager = module.DynamicAtlasManager;
      macro = module.macro;
      Sprite = module.Sprite;
      Label = module.Label;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
      DefaultScene = module.DefaultScene;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      SceneManager = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "df70eEQ4fdDQZCSe1on4+Mz", "Loading", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      DynamicAtlasManager.instance.enabled = true;
      macro.CLEANUP_IMAGE_CACHE = false;
      var Loading = exports('default', (_dec = property(Sprite), _dec2 = property(Label), ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Loading, _Component);
        function Loading() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "progressSpeed", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "progressBar", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelProgress", _descriptor3, _assertThisInitialized(_this));
          // private progressBar: ProgressBar;
          _this.loadStep = 0;
          _this.targetProgress = void 0;
          _this.progressTween = void 0;
          _this.loadOver = false;
          return _this;
        }
        var _proto = Loading.prototype;
        _proto.onLoad = function onLoad() {
          // this.progressBar = this.node.getComponentInChildren(ProgressBar);
          this.progressBar.fillRange = 0;
          this.labelProgress.string = "0%";
          GlobalEventManager.getInstance().on(GlobalEvent.Preloaded, this.preloadedListener, this);
          GlobalEventManager.getInstance().on(GlobalEvent.AddPreload, this.addPreloadListener, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.start = function start() {
          this.updateProgress();
        };
        _proto.update = function update(dt) {
          if (this.loadOver) {
            this.loadOver = false;
            SceneManager.getInstance().loadScene(DefaultScene.Lobby);
          }
        };
        _proto.addPreloadListener = function addPreloadListener(value) {
          value ? this.loadStep += value : this.loadStep++;
          this.targetProgress = [];
          var t = Math.floor(1 / this.loadStep * 10) / 10;
          for (var i = 0; i < this.loadStep; i++) {
            this.targetProgress[i] = Math.min(t * (i + 1), 1);
            if (i == this.loadStep - 1 && this.targetProgress[i] != 1) this.targetProgress[i] = 1;
          }
        };
        _proto.preloadedListener = function preloadedListener() {
          this.loadStep--;
          this.updateProgress();
        };
        _proto.updateProgress = function updateProgress() {
          var _this2 = this;
          if (this.progressTween) this.progressTween.stop();
          this.progressTween = tween(this.progressBar).to(this.progressSpeed, {
            fillRange: this.targetProgress[this.targetProgress.length - this.loadStep - 1]
          }, {
            onUpdate: function onUpdate(target, ratio) {
              _this2.labelProgress.string = Math.floor(_this2.progressBar.fillRange * 100) + "%";
            }
          }).call(function () {
            _this2.loadOver = _this2.loadStep == 0;
          }).start();
        };
        return Loading;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progressSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labelProgress", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Lobby.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "35d813TomBD4KyvkJdL7DSZ", "Lobby", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Lobby = exports('default', ccclass(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Lobby, _Component);
        function Lobby() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = Lobby.prototype;
        // LIFE-CYCLE CALLBACKS:
        _proto.onLoad = function onLoad() {};
        _proto.start = function start() {}

        // update (dt) {}
        ;

        return Lobby;
      }(Component)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LobbyView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './BuildingDataManager.ts', './BuildGoldConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Component, GameDataManager, BuildingDataManager, BuildGoldConfig;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }, function (module) {
      BuildGoldConfig = module.BuildGoldConfig;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "dcffbBWisBILpdUgTFWZ5X6", "LobbyView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LobbyView = exports('LobbyView', (_dec = ccclass('LobbyView'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property([Node]), _dec6 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LobbyView, _Component);
        function LobbyView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "invasionView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameRoot", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lobbyView", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "buildingButtons", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelBuildingPrice", _descriptor5, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = LobbyView.prototype;
        _proto.start = function start() {
          this.onNeedRebuiltListener(BuildingDataManager.getInstance().needRebuilt.cur);
          GameDataManager.getInstance().invasion.addChangeListener(this.onInvasionListener, this);
          BuildingDataManager.getInstance().needRebuilt.addChangeListener(this.onNeedRebuiltListener, this);
          BuildingDataManager.getInstance().buildCount.addChangeListener(this.onBuildingCountUpdate, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().invasion.removeChangeListener(this.onInvasionListener, this);
          BuildingDataManager.getInstance().needRebuilt.removeChangeListener(this.onNeedRebuiltListener, this);
          BuildingDataManager.getInstance().buildCount.removeChangeListener(this.onBuildingCountUpdate, this);
        };
        _proto.update = function update(deltaTime) {};
        _proto.onInvasionListener = function onInvasionListener(cur) {
          this.invasionView.active = cur == 1;
          this.gameRoot.active = !this.invasionView.active;
          this.lobbyView.active = this.gameRoot.active;
        };
        _proto.onNeedRebuiltListener = function onNeedRebuiltListener(cur) {
          if (cur && BuildingDataManager.getInstance().rebuiltGold.cur) {
            this.labelBuildingPrice.string = BuildingDataManager.getInstance().rebuiltGold.cur.toString();
          } else {
            var price = BuildGoldConfig.getInstance().getPrice(BuildingDataManager.getInstance().buildCount.cur + 1, BuildingDataManager.getInstance().storey);
            this.labelBuildingPrice.string = price ? price.toString() : "0";
          }
          this.buildingButtons.forEach(function (button, index) {
            button.active = cur == index;
          });
        };
        _proto.onBuildingCountUpdate = function onBuildingCountUpdate() {
          this.onNeedRebuiltListener(0);
        };
        return LobbyView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "invasionView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameRoot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lobbyView", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "buildingButtons", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelBuildingPrice", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalDataComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './StorageManager.ts', './ExInteger.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, StorageManager, ExInteger;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      StorageManager = module.default;
    }, function (module) {
      ExInteger = module.default;
    }],
    execute: function () {
      var _class, _class2, _descriptor;
      cclegacy._RF.push({}, "5311d0gjBBEerkLQUebdEsX", "LocalDataComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LocalDataComponent = exports('default', ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LocalDataComponent, _Component);
        function LocalDataComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "key", _descriptor, _assertThisInitialized(_this));
          _this.data = void 0;
          _this.lastDataStr = void 0;
          return _this;
        }
        var _proto = LocalDataComponent.prototype;
        _proto.onLoad = function onLoad() {
          this.beforeInit();
          this.data = this.defaultInit();
          var storageData = StorageManager.getInstance().get(this.key);
          this.initPropertys(this.data, storageData);
          this.initData(this.data);
          this.init();
        };
        _proto.beforeInit = function beforeInit() {};
        _proto.defaultInit = function defaultInit() {
          return null;
        };
        _proto.init = function init() {};
        _proto.save = function save() {
          var storage = this.transData(this.data);
          var str = JSON.stringify(storage);
          if (this.lastDataStr != str) {
            this.lastDataStr = str;
            StorageManager.getInstance().set(this.key, str, false);
          }
        };
        _proto.transData = function transData(data, storage) {
          if (storage === void 0) {
            storage = {};
          }
          for (var k in data) {
            if (data[k] instanceof ExInteger) {
              var _int = data[k];
              storage[k] = _int.cur;
            } else if (typeof data[k] == "object") {
              if (data[k].shift) storage[k] = this.transData(data[k], []);else storage[k] = this.transData(data[k], {});
            } else {
              storage[k] = data[k];
            }
          }
          return storage;
        };
        _proto.initPropertys = function initPropertys(data, storageData) {
          var _this2 = this;
          for (var k in storageData) {
            if (typeof storageData[k] == "object") {
              if (!data[k]) {
                if (storageData[k].shift) data[k] = [];else data[k] = {};
              }
              data[k] = this.initPropertys(data[k], storageData[k]);
            } else if (data && data[k] instanceof ExInteger) {
              var _int = data[k];
              if (storageData) _int.init(storageData[k]).setWriteListener(function () {
                return _this2.save();
              });else _int.setWriteListener(function () {
                return _this2.save();
              });
            } else {
              data[k] = storageData[k];
            }
          }
          return data;
        };
        _proto.initData = function initData(data) {
          var _this3 = this;
          for (var k in data) {
            if (data[k] instanceof ExInteger) {
              var _int = data[k];
              _int.setWriteListener(function () {
                return _this3.save();
              });
            } else if (typeof data[k] == "object") {
              this.initData(data[k]);
            }
          }
        };
        return LocalDataComponent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "key", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoginHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalConfig.ts', './GlobalEventManager.ts', './GameDataManager.ts', './NetWorkHandler.ts', './GameNetRequest.ts', './BuildingDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GlobalEvent, GlobalEventManager, GameDataManager, NetWorkHandler, GameNetRequest, BuildingDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a80fc/M6kJCT5wRAOjXmoWe", "LoginHandler", undefined);
      var LoginHandler = exports('LoginHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(LoginHandler, _NetWorkHandler);
        function LoginHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = LoginHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("LoginHandler!!", this.data);
          GameDataManager.getInstance().data.soul.set(this.data.soulCount);
          GameDataManager.getInstance().data.gold.set(this.data.goldCoin);
          GameDataManager.getInstance().data.shield.set(this.data.shieldCount);
          if (this.data.totalDiceCount) GameDataManager.getInstance().diceMax = this.data.totalDiceCount;
          GameDataManager.getInstance().data.dice.set(this.data.currentDiceCount);
          GameDataManager.getInstance().data.nick.set(this.data.nickName);
          GameDataManager.getInstance().data.playerId.set(this.data.playerId);
          GameDataManager.getInstance().data.pos.set(this.data.currentRolePostion);
          GameDataManager.getInstance().data.avatar.set(this.data.avatarNo);
          GameDataManager.getInstance().data.role.set(this.data.currentRoleId ? this.data.currentRoleId : 1);
          if (this.data.ownRoleIds) this.data.ownRoleIds.forEach(function (t) {
            return GameDataManager.getInstance().owndRoles.push(t);
          });
          BuildingDataManager.getInstance().totalStorey = this.data.currentStorey;
          BuildingDataManager.getInstance().storey = this.data.currentStorey;
          BuildingDataManager.getInstance().buildCount.max = this.data.totalBuildCount;
          BuildingDataManager.getInstance().buildCount.set(this.data.currentBuildCount);

          //登录成功后请求玩家楼层信息
          BuildingDataManager.getInstance().getBuildingInfo(this.data.currentStorey);
          GameNetRequest.getCardsInfo();
          GlobalEventManager.getInstance().emit(GlobalEvent.Preloaded);
        };
        return LoginHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoginInput.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UserNetRequest.ts', './GameLocalData.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, log, Component, UserNetRequest, GameLocalData;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      log = module.log;
      Component = module.Component;
    }, function (module) {
      UserNetRequest = module.UserNetRequest;
    }, function (module) {
      GameLocalData = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ef72ajRqUBGuJtIi+ZktSgG", "LoginInput", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LoginInput = exports('LoginInput', (_dec = ccclass('LoginInput'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoginInput, _Component);
        function LoginInput() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = LoginInput.prototype;
        _proto.start = function start() {
          if (GameLocalData.instance.data.token) {
            this.onClickLogin();
          }
        };
        _proto.onEditEnd = function onEditEnd(editBox) {
          log(editBox.string);
          GameLocalData.instance.data.token = editBox.string;
        };
        _proto.onClickLogin = function onClickLogin() {
          if (!GameLocalData.instance.data.token) GameLocalData.instance.data.token = GameLocalData.instance.generateRandomString32();
          UserNetRequest.login(GameLocalData.instance.data.token);
          this.node.active = false;
          GameLocalData.instance.save();
        };
        return LoginInput;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./GlobalConfig.ts', './AudioComponent.ts', './AudioPlayer.ts', './MusicPlayer.ts', './AutoReleaseBundle.ts', './DeltaTimeComponent.ts', './KeyboardCenter.ts', './NodePool.ts', './NodePoolComponent.ts', './PersistentNode.ts', './ResLoader.ts', './ResPreLoader.ts', './SpineAnimState.ts', './SpineControllComponent.ts', './ExInteger.ts', './ExString.ts', './LocalDataComponent.ts', './SwitchState.ts', './RedPointData.ts', './UserDataComponent.ts', './UserSettingComponent.ts', './UserVitComponent.ts', './GlobalEventManager.ts', './NodePoolManager.ts', './SceneManager.ts', './Singleton.ts', './StorageManager.ts', './AutoAdaptBg.ts', './AutoAdaptSprite.ts', './ChatAdaptLabel.ts', './ClickAudio.ts', './ClickBackLobbyComponent.ts', './ClickClearLocalData.ts', './ClickCloseView.ts', './ClickComponent.ts', './ClickFullScreen.ts', './ClickOpenView.ts', './ColorSelector.ts', './DraggableComponent.ts', './GraphicsComponent.ts', './MutexActiveComponent.ts', './SpriteFrameComponent.ts', './ToggleGroup.ts', './RedPoint.ts', './RedPointCenter.ts', './ListViewComponent.ts', './SuperListData.ts', './SuperPageIndicator.ts', './SuperPageView.ts', './TweenAbsoluteMove.ts', './TweenAnimBase.ts', './TweenBreath.ts', './TweenDelayCloseView.ts', './TweenFade.ts', './TweenFloat.ts', './TweenRelativeMove.ts', './TweenRewardsFly.ts', './TweenScale.ts', './TweenZoom.ts', './ViewCenter.ts', './ViewComponent.ts', './ViewInCanvasMarker.ts', './ViewManageCenter.ts', './ViewParentMarker.ts', './Encrypter.ts', './Handler.ts', './Handlers.ts', './Utils.ts', './UtilsBezier.ts', './FloatingView.ts', './Joystick.ts', './JoystickEnum.ts', './TemplateListView.ts', './TemplatePageView.ts', './SettingView.ts', './VitComponent.ts', './protobuf_game.mjs_cjs=&original=.js', './Constants.ts', './CustomPreloader.ts', './Loading.ts', './Lobby.ts', './BuffBaseConfig.ts', './BuffLevelConfig.ts', './BuildBaseConfig.ts', './BuildGoldConfig.ts', './CardBaseConfig.ts', './CardLevelConfig.ts', './CardSuitConfig.ts', './RoleConfig.ts', './BuildingDataManager.ts', './CardsDataManager.ts', './FriendsDataManager.ts', './GameDataManager.ts', './GameLocalData.ts', './Dice.ts', './DiceAnimation.ts', './RollLogic.ts', './ViewPortFollow.ts', './Board.ts', './BoardEffectNode.ts', './BoardGrid.ts', './Character.ts', './AirBoatAnimation.ts', './BuildingBg.ts', './BuildingEffect.ts', './BuildingItem.ts', './BuildingMap.ts', './BuildingRoot.ts', './TargetBuildingRoot.ts', './NetConstant.ts', './NetNode.ts', './NetWorkHandler.ts', './NetComponent.ts', './NetConfig.ts', './AvatarChangeHandler.ts', './BaseInfoHandler.ts', './BuffActiveHandler.ts', './BuildingFloorHandler.ts', './BuildingHandler.ts', './CardUpgradeHandler.ts', './CardsDrawHandler.ts', './CardsInfoHandler.ts', './HeartBeatHandler.ts', './IntrusionHandler.ts', './LoginHandler.ts', './NetErrorHandler.ts', './NickChangeHandler.ts', './RebuildHandler.ts', './RollHandler.ts', './SoulRankHandler.ts', './UpdateRoleHandler.ts', './GameNetRequest.ts', './UserNetRequest.ts', './UIConstant.ts', './ButtonAddDice.ts', './ButtonBuild.ts', './ButtonDrawCard.ts', './ButtonInvasionCollect.ts', './ButtonMulti.ts', './ButtonRepair.ts', './ButtonRoll.ts', './ButtonRollContinuous.ts', './AssetGold.ts', './AssetShield.ts', './AssetSoul.ts', './AvatarComponent.ts', './BuffLayer.ts', './BuildButtonPrice.ts', './CacheRewardsCenter.ts', './CardItem.ts', './EntryAnimControll.ts', './GestureScaling.ts', './LayerDiceNum.ts', './LineFloorInfo.ts', './LoginInput.ts', './MaskTouch.ts', './NickComponent.ts', './SpriteAnimator.ts', './AvatarView.ts', './CardsDrawingView.ts', './CardsMintView.ts', './CardsUpgradeView.ts', './CardsView.ts', './ChangeNickView.ts', './InvasionView.ts', './LobbyView.ts', './RankView.ts', './RoleSelectPageView.ts', './SideBarView.ts', './debug-view-runtime-control.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MaskTouch.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIConstant.ts', './GlobalEventManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, UIEvent, GlobalEventManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      GlobalEventManager = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "14671kKbURKMKYzzLXgyj4o", "MaskTouch", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MaskTouch = exports('MaskTouch', (_dec = ccclass('MaskTouch'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MaskTouch, _Component);
        function MaskTouch() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = MaskTouch.prototype;
        _proto.onLoad = function onLoad() {
          GlobalEventManager.getInstance().on(UIEvent.EnableMaskTouch, this.onEnableMaskTouch, this);
          this.node.active = false;
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.onEnableMaskTouch = function onEnableMaskTouch(enable) {
          this.node.active = enable;
        };
        return MaskTouch;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MusicPlayer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './GlobalConfig.ts', './AudioComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, GlobalEventManager, GlobalEvent, AudioComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }, function (module) {
      AudioComponent = module.AudioComponent;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "d7842SfOzZFrbnG9TEHwGAJ", "MusicPlayer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var MusicPlayer = exports('default', (_dec = menu("1-Audio/MusicPlayer"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MusicPlayer, _Component);
        function MusicPlayer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "audioName", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isLoop", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playOnStart", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playOnEnable", _descriptor4, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = MusicPlayer.prototype;
        _proto.start = function start() {
          if (this.playOnStart) this.play();
          GlobalEventManager.getInstance().on(GlobalEvent.AudioPreloaded, this.onAudioPreloadedListener, this);
        };
        _proto.onEnable = function onEnable() {
          if (this.playOnEnable) this.play();
        };
        _proto.onAudioPreloadedListener = function onAudioPreloadedListener() {
          if (this.playOnStart) this.play();
        };
        _proto.play = function play() {
          if (AudioComponent.instance.musicAudioSource.clip && AudioComponent.instance.musicAudioSource.clip.name == this.audioName) return;
          AudioComponent.instance.playMusic(this.audioName, this.isLoop);
        };
        return MusicPlayer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isLoop", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playOnStart", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playOnEnable", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MutexActiveComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "52bf6rZ6ZRDPJypO5BNiKaU", "MutexActiveComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var MutexActiveComponent = exports('default', (_dec = menu("1-UI/MutexActiveComponent"), _dec2 = property([Node]), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MutexActiveComponent, _Component);
        function MutexActiveComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "objs", _descriptor, _assertThisInitialized(_this));
          _this.state = 0;
          _this.lastObj = void 0;
          _this.lastStatus = void 0;
          _this.isInited = false;
          return _this;
        }
        var _proto = MutexActiveComponent.prototype;
        // LIFE-CYCLE CALLBACKS:
        _proto.onLoad = function onLoad() {
          this.init();
        };
        _proto.setStatus = function setStatus(status) {
          if (this.lastStatus == status) return;
          if (status >= this.objs.length) return;
          if (this.lastObj) {
            this.lastObj.active = false;
          }
          this.lastObj = this.objs[status];
          this.lastObj.active = true;
          this.state = status;
          this.lastStatus = status;
        };
        _proto.init = function init() {
          if (this.isInited) return this;
          this.isInited = true;
          for (var i = 0; i < this.objs.length; i++) {
            this.objs[i].active = i == 0;
          }
          this.lastObj = this.objs[0];
          return this;
        };
        return MutexActiveComponent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "objs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LoginHandler.ts', './HeartBeatHandler.ts', './NickChangeHandler.ts', './AvatarChangeHandler.ts', './RollHandler.ts', './BuildingHandler.ts', './BuildingFloorHandler.ts', './NetConstant.ts', './GlobalEventManager.ts', './GlobalConfig.ts', './NetErrorHandler.ts', './NetNode.ts', './NetConfig.ts', './BaseInfoHandler.ts', './IntrusionHandler.ts', './RebuildHandler.ts', './CardsInfoHandler.ts', './CardsDrawHandler.ts', './CardUpgradeHandler.ts', './BuffActiveHandler.ts', './SoulRankHandler.ts', './UpdateRoleHandler.ts', './GameLocalData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, log, Component, LoginHandler, HeartBeatHandler, NickChangeHandler, AvatarChangeHandler, RollHandler, BuildingHandler, BuildingFloorHandler, NetCode, GlobalEventManager, GlobalEvent, NetErrorHandler, NetNode, NetConfig, BaseInfoHandler, IntrusionHandler, RebuildHandler, CardsInfoHandler, CardsDrawHandler, CardUpgradeHandler, BuffActiveHandler, SoulRankHandler, UpdateRoleHandler, GameLocalData;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      log = module.log;
      Component = module.Component;
    }, function (module) {
      LoginHandler = module.LoginHandler;
    }, function (module) {
      HeartBeatHandler = module.HeartBeatHandler;
    }, function (module) {
      NickChangeHandler = module.NickChangeHandler;
    }, function (module) {
      AvatarChangeHandler = module.AvatarChangeHandler;
    }, function (module) {
      RollHandler = module.RollHandler;
    }, function (module) {
      BuildingHandler = module.BuildingHandler;
    }, function (module) {
      BuildingFloorHandler = module.BuildingFloorHandler;
    }, function (module) {
      NetCode = module.NetCode;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }, function (module) {
      NetErrorHandler = module.NetErrorHandler;
    }, function (module) {
      NetNode = module.NetNode;
    }, function (module) {
      NetConfig = module.NetConfig;
    }, function (module) {
      BaseInfoHandler = module.BaseInfoHandler;
    }, function (module) {
      IntrusionHandler = module.IntrusionHandler;
    }, function (module) {
      RebuildHandler = module.RebuildHandler;
    }, function (module) {
      CardsInfoHandler = module.CardsInfoHandler;
    }, function (module) {
      CardsDrawHandler = module.CardsDrawHandler;
    }, function (module) {
      CardUpgradeHandler = module.CardUpgradeHandler;
    }, function (module) {
      BuffActiveHandler = module.BuffActiveHandler;
    }, function (module) {
      SoulRankHandler = module.SoulRankHandler;
    }, function (module) {
      UpdateRoleHandler = module.UpdateRoleHandler;
    }, function (module) {
      GameLocalData = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _class3;
      cclegacy._RF.push({}, "0d80bFP1oxGdof5CeKtqfab", "NetComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var NetComponent = exports('NetComponent', (_dec = ccclass('NetComponent'), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NetComponent, _Component);
        function NetComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "localDebug", _descriptor, _assertThisInitialized(_this));
          _this.handlers = [new LoginHandler(OPLoginRet, NetCode.OPCODE_PLAYER_LOGIN), new HeartBeatHandler(OPHeartBeatRet, NetCode.OPCODE_HEART_BEAT), new NickChangeHandler(OPUpdateNickNameRet, NetCode.OPCODE_UPDATE_NICK_NAME), new AvatarChangeHandler(OPUpdateAvatarRet, NetCode.OPCODE_UPDATE_AVATAR), new RollHandler(OPRollDiceRet, NetCode.OPCODE_ROLL_DICE), new BuildingHandler(OPCreateBuildRet, NetCode.OPCODE_CREATE_BUILD), new BuildingFloorHandler(OPGetBuildStoreyRet, NetCode.OPCODE_BUILD_STOREY), new NetErrorHandler(OPErrorInfo, NetCode.PUSH_ERROR_CODE), new BaseInfoHandler(PushBaseInfo, NetCode.PUSH_BASE_INFO_CODE), new IntrusionHandler(OPIntrusionRet, NetCode.OPCODE_INTRUSION), new RebuildHandler(OPReBuildRet, NetCode.OPCODE_REBUILD), new CardsInfoHandler(OPGetCardListRet, NetCode.OPCODE_GET_CARD_LIST), new CardsDrawHandler(OPDrawCardsRet, NetCode.OPCODE_DRAW_CARD), new CardUpgradeHandler(OPCardUpRet, NetCode.OPCODE_CARD_UP), new BuffActiveHandler(OPCardGroupStatusRet, NetCode.OPCODE_CARD_GROUP_STATUS), new SoulRankHandler(OPSoulRankRet, NetCode.OPCODE_SOUL_RANK), new UpdateRoleHandler(OPUpdateRoleIdRet, NetCode.OPCODE_UPDATE_ROLE_ID)];
          _this.gameServer = void 0;
          return _this;
        }
        var _proto = NetComponent.prototype;
        _proto.onLoad = function onLoad() {
          NetComponent.instance = this;
          if (!this.localDebug) {
            this.gameServer = new NetNode(NetConfig.instance.gameServerUrl, this.handlers);
            this.gameServer.setHeartBeatReq(OPHeartBeat.encode({}).finish(), NetCode.OPCODE_HEART_BEAT);
            this.gameServer.connect();
            this.gameServer.onOpenHandlers.add(this.onOpenHandler.bind(this));
          }
        };
        _proto.start = function start() {
          if (!this.localDebug) GlobalEventManager.getInstance().emit(GlobalEvent.AddPreload, 2);
        };
        _proto.onOpenHandler = function onOpenHandler() {
          log("token", GameLocalData.instance.data.token);
          // UserNetRequest.login(GameLocalData.instance.data.token);
        };

        return NetComponent;
      }(Component), _class3.instance = void 0, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "localDebug", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, JsonAsset, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      JsonAsset = module.JsonAsset;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class3, _class4, _descriptor, _class5;
      cclegacy._RF.push({}, "a54feg6VgpETpZYwqkS0hWz", "NetConfig", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var NetConfig = exports('NetConfig', (_dec = ccclass('NetConfig'), _dec2 = property(JsonAsset), _dec(_class3 = (_class4 = (_class5 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NetConfig, _Component);
        function NetConfig() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "config", _descriptor, _assertThisInitialized(_this));
          _this.data = void 0;
          return _this;
        }
        var _proto = NetConfig.prototype;
        _proto.onLoad = function onLoad() {
          NetConfig.instance = this;
          this.data = this.config.json;
        };
        _createClass(NetConfig, [{
          key: "gameServerUrl",
          get: function get() {
            var _this$data$gameserver, _this$data$gameserver2;
            return ((_this$data$gameserver = this.data.gameserver.prefix) != null ? _this$data$gameserver : "") + this.data.gameserver.url + ":" + this.data.gameserver.port + ((_this$data$gameserver2 = this.data.gameserver.suffix) != null ? _this$data$gameserver2 : "");
          }
        }]);
        return NetConfig;
      }(Component), _class5.instance = void 0, _class5), _descriptor = _applyDecoratedDescriptor(_class4.prototype, "config", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class4)) || _class3));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetConstant.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8e6c8XN+eVICqZ7oSTyHVm4", "NetConstant", undefined);
      var NetCode = exports('NetCode', /*#__PURE__*/function (NetCode) {
        NetCode[NetCode["PUSH_ERROR_CODE"] = 10001] = "PUSH_ERROR_CODE";
        NetCode[NetCode["PUSH_BASE_INFO_CODE"] = 10002] = "PUSH_BASE_INFO_CODE";
        NetCode[NetCode["OPCODE_PLAYER_LOGIN"] = 20001] = "OPCODE_PLAYER_LOGIN";
        NetCode[NetCode["OPCODE_HEART_BEAT"] = 20002] = "OPCODE_HEART_BEAT";
        NetCode[NetCode["OPCODE_UPDATE_NICK_NAME"] = 20003] = "OPCODE_UPDATE_NICK_NAME";
        NetCode[NetCode["OPCODE_UPDATE_AVATAR"] = 20004] = "OPCODE_UPDATE_AVATAR";
        NetCode[NetCode["OPCODE_SOUL_RANK"] = 20005] = "OPCODE_SOUL_RANK";
        NetCode[NetCode["OPCODE_UPDATE_ROLE_ID"] = 20006] = "OPCODE_UPDATE_ROLE_ID";
        NetCode[NetCode["OPCODE_ROLL_DICE"] = 30001] = "OPCODE_ROLL_DICE";
        NetCode[NetCode["OPCODE_CREATE_BUILD"] = 30002] = "OPCODE_CREATE_BUILD";
        NetCode[NetCode["OPCODE_BUILD_STOREY"] = 30003] = "OPCODE_BUILD_STOREY";
        NetCode[NetCode["OPCODE_REBUILD"] = 30004] = "OPCODE_REBUILD";
        NetCode[NetCode["OPCODE_INTRUSION"] = 30005] = "OPCODE_INTRUSION";
        NetCode[NetCode["OPCODE_GET_CARD_LIST"] = 40001] = "OPCODE_GET_CARD_LIST";
        NetCode[NetCode["OPCODE_DRAW_CARD"] = 40002] = "OPCODE_DRAW_CARD";
        NetCode[NetCode["OPCODE_CARD_UP"] = 40003] = "OPCODE_CARD_UP";
        NetCode[NetCode["OPCODE_CARD_GROUP_STATUS"] = 40004] = "OPCODE_CARD_GROUP_STATUS";
        return NetCode;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetErrorHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalConfig.ts', './GlobalEventManager.ts', './BuildingDataManager.ts', './CardsDataManager.ts', './UIConstant.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GlobalConstant, GlobalEventManager, BuildingDataManager, CardsDataManager, UIEvent, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GlobalConstant = module.GlobalConstant;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      BuildingDataManager = module.BuildingDataManager;
    }, function (module) {
      CardsDataManager = module.CardsDataManager;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dd5d018hB1BUaGxSDJkJka0", "NetErrorHandler", undefined);

      // e0(0, "操作成功"), 
      // e1000(-1000, "数据错误"),
      // e1001(-1001, "金币不足"),
      // e1002(-1002, "骰子数量不足"),
      // e1003(-1003, "该位置已有建筑"),
      // e1005(-1005, "已满级"),
      // e1006(-1006, "灵魂数量不足"),
      // e1004(-1004, "名字已存在");
      var NetErrorCode = /*#__PURE__*/function (NetErrorCode) {
        NetErrorCode[NetErrorCode["DataError"] = -1000] = "DataError";
        NetErrorCode[NetErrorCode["GoldNotEnough"] = -1001] = "GoldNotEnough";
        NetErrorCode[NetErrorCode["DiceNotEnough"] = -1002] = "DiceNotEnough";
        NetErrorCode[NetErrorCode["BuildingExist"] = -1003] = "BuildingExist";
        NetErrorCode[NetErrorCode["BuildingMaxLevel"] = -1005] = "BuildingMaxLevel";
        NetErrorCode[NetErrorCode["SoulNotEnough"] = -1006] = "SoulNotEnough";
        NetErrorCode[NetErrorCode["NameExist"] = -1004] = "NameExist";
        return NetErrorCode;
      }(NetErrorCode || {});
      var NetErrorHandler = exports('NetErrorHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(NetErrorHandler, _NetWorkHandler);
        function NetErrorHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = NetErrorHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("NetErrorHandler!!", this.data);
          this.data.code;
          switch (this.data.code) {
            case NetErrorCode.DataError:
              break;
            case NetErrorCode.GoldNotEnough:
              GlobalConstant.showFloatingTip("金币不足");
              GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
              break;
            case NetErrorCode.BuildingExist:
              BuildingDataManager.getInstance().building();
              break;
            case NetErrorCode.SoulNotEnough:
              CardsDataManager.getInstance().drawState.setState(0);
              break;
          }
        };
        return NetErrorHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetNode.ts", ['cc', './Handlers.ts'], function (exports) {
  var cclegacy, _decorator, Handlers;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Handlers = module.Handlers;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9493bhl1aZKxLn42q2L2+kr", "NetNode", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var NetStatus = /*#__PURE__*/function (NetStatus) {
        NetStatus[NetStatus["Closed"] = 0] = "Closed";
        NetStatus[NetStatus["Connecting"] = 1] = "Connecting";
        NetStatus[NetStatus["Working"] = 2] = "Working";
        return NetStatus;
      }(NetStatus || {});
      var NetNode = exports('NetNode', /*#__PURE__*/function () {
        function NetNode(url, handlers, binaryType) {
          if (binaryType === void 0) {
            binaryType = "arraybuffer";
          }
          this.onOpenHandlers = new Handlers();
          this.onCloseHandlers = new Handlers();
          this.onErrorHandlers = new Handlers();
          this._ws = null;
          this.requestCache = [];
          this.handlers = [];
          this.status = NetStatus.Closed;
          this.reconnectTimer = void 0;
          this.reconnectTimeOut = 2000;
          this.heartBeatTimer = void 0;
          this.heartBeatTimeOut = 15000;
          this.heartBeatBuffer = void 0;
          this.heartBeatCode = void 0;
          this.url = void 0;
          this.binaryType = void 0;
          this.handlers = handlers;
          this.url = url;
          this.binaryType = binaryType;
        }
        var _proto = NetNode.prototype;
        _proto.setHeartBeatReq = function setHeartBeatReq(heartBeatBuffer, heartBeatCode) {
          this.heartBeatBuffer = heartBeatBuffer;
          this.heartBeatCode = heartBeatCode;
        };
        _proto.connect = function connect() {
          var _this = this;
          if (this.status != NetStatus.Closed) return;
          this.status = NetStatus.Connecting;
          this._ws = new WebSocket(this.url);
          this._ws.binaryType = this.binaryType;
          this._ws.onmessage = function (event) {
            _this.decode(event.data);
            _this.heartBeat();
          };
          this._ws.onopen = function (event) {
            console.log("open!!");
            _this.status = NetStatus.Working;
            while (_this.requestCache.length) {
              var reqBuffer = _this.requestCache.shift();
              _this._ws.send(reqBuffer);
            }
            _this.onOpenHandlers.emit();
          };
          this._ws.onclose = function (event) {
            console.log("close!!", event.reason);
            _this.status = NetStatus.Closed;
            _this.onCloseHandlers.emit(event);
            _this.reconnect();
          };
          this._ws.onerror = function (event) {
            console.log("error!!", event);
            _this.onErrorHandlers.emit();
          };
          this.handlers.forEach(function (t) {
            return t.socket = _this._ws;
          });
        };
        _proto.send = function send(msg, code, cache) {
          if (cache === void 0) {
            cache = true;
          }
          if (!this._ws) return;
          var buffer = this.encode(msg, code);
          if (this.status == NetStatus.Working) {
            this._ws.send(buffer);
          } else {
            if (cache) this.requestCache.push(buffer);
          }
        };
        _proto.close = function close(code, reason) {
          if (this._ws) {
            this._ws.close(code, reason);
          }
        };
        _proto.clearCache = function clearCache() {
          this.requestCache = [];
        };
        _proto.reconnect = function reconnect() {
          var _this2 = this;
          if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
          this.reconnectTimer = setTimeout(function () {
            _this2.connect();
          }, this.reconnectTimeOut);
        };
        _proto.encode = function encode(msg, code) {
          var len = msg.byteLength;
          var arrayBuffer = new ArrayBuffer(10 + len);
          var dv = new DataView(arrayBuffer);
          dv.setUint16(0, 0x5D6B);
          dv.setUint32(2, code);
          dv.setUint32(6, len);
          for (var i = 0; i < len; i++) {
            dv.setUint8(10 + i, msg[i]);
          }
          return dv.buffer;
        };
        _proto.decode = function decode(data) {
          var _this$handlers$find;
          var dv = new DataView(data);
          var code = dv.getUint32(2);
          var msgLen = dv.getUint32(6);
          var array = new Uint8Array(data, 10, msgLen);
          (_this$handlers$find = this.handlers.find(function (t) {
            return t.code == code;
          })) == null || _this$handlers$find.decode(array);
        };
        _proto.heartBeat = function heartBeat() {
          var _this3 = this;
          if (this.heartBeatTimer) clearTimeout(this.heartBeatTimer);
          this.heartBeatTimer = setTimeout(function () {
            _this3.send(_this3.heartBeatBuffer, _this3.heartBeatCode, false);
          }, this.heartBeatTimeOut);
        };
        return NetNode;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetWorkHandler.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1c2d4/vhuxLEKYmcls8yrib", "NetWorkHandler", undefined);
      var NetWorkHandler = exports('NetWorkHandler', /*#__PURE__*/function () {
        function NetWorkHandler(proto, code) {
          this.socket = null;
          this.code = void 0;
          this.data = void 0;
          this.protoResponse = void 0;
          this.protoResponse = proto;
          this.code = code;
        }
        var _proto = NetWorkHandler.prototype;
        _proto.decode = function decode(array) {
          this.data = this.protoResponse.decode(array);
          this.onHandler();
        };
        _proto.onHandler = function onHandler() {};
        return NetWorkHandler;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NickChangeHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GameDataManager, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2bfffIOQZpOBrAfhgpZXB0S", "NickChangeHandler", undefined);
      var NickChangeHandler = exports('NickChangeHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(NickChangeHandler, _NetWorkHandler);
        function NickChangeHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = NickChangeHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("msg!!", this.data);
          GameDataManager.getInstance().data.nick.set(this.data.nickName);
        };
        return NickChangeHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NickComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, Component, GameDataManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "f70da2bVudCSozBWyMFlrNV", "NickComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var NickComponent = exports('NickComponent', (_dec = ccclass('NickComponent'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NickComponent, _Component);
        function NickComponent() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = NickComponent.prototype;
        _proto.start = function start() {
          this.onNickChange(GameDataManager.getInstance().data.nick.cur);
          GameDataManager.getInstance().data.nick.addChangeListener(this.onNickChange, this);
        };
        _proto.onDestroy = function onDestroy() {
          GameDataManager.getInstance().data.nick.removeChangeListener(this.onNickChange, this);
        };
        _proto.onNickChange = function onNickChange(nick) {
          this.node.getComponent(Label).string = nick;
        };
        return NickComponent;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NodePool.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, isValid;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      isValid = module.isValid;
    }],
    execute: function () {
      cclegacy._RF.push({}, "894d3njawJJu5JRFI7QgRNA", "NodePool", undefined);
      var NodePool = exports('NodePool', /*#__PURE__*/function () {
        function NodePool() {
          this.pool = [];
        }
        var _proto = NodePool.prototype;
        _proto.get = function get(delayActive) {
          if (delayActive === void 0) {
            delayActive = false;
          }
          var item = this.pool.find(function (t) {
            return !t.active && isValid(t);
          });
          if (!delayActive && item) item.active = true;
          return item;
        };
        _proto.put = function put(node) {
          node.active = false;
          if (this.pool.indexOf(node) < 0) this.pool.push(node);
        };
        _createClass(NodePool, [{
          key: "size",
          get: function get() {
            return this.pool.length;
          }
        }]);
        return NodePool;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NodePoolComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResLoader.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, _inheritsLoose, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Node, Prefab, instantiate, isValid, director, Component, ResLoader, ResType, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      isValid = module.isValid;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }, function (module) {
      Utils = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _dec5, _class4, _class5, _descriptor3;
      cclegacy._RF.push({}, "e21781uzmxJZrqV+TcFp04l", "NodePoolComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var NodePoolData = (_dec = ccclass("NodePoolData"), _dec2 = property(Node), _dec3 = property(Prefab), _dec(_class = (_class2 = function NodePoolData() {
        _initializerDefineProperty(this, "node", _descriptor, this);
        _initializerDefineProperty(this, "prefab", _descriptor2, this);
        this.model = null;
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "node", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class);
      var NodePoolComponent = exports('default', (_dec4 = menu("1-Other/NodePoolComponent"), _dec5 = property([NodePoolData]), ccclass(_class4 = _dec4(_class4 = (_class5 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NodePoolComponent, _Component);
        function NodePoolComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "prefabs", _descriptor3, _assertThisInitialized(_this));
          _this.pool = {};
          return _this;
        }
        var _proto = NodePoolComponent.prototype;
        _proto.onLoad = function onLoad() {
          for (var i = this.prefabs.length - 1; i >= 0; i--) {
            var data = this.prefabs[i];
            if (data.node != null) {
              data.model = data.node;
              data.node.active = false;
              continue;
            }
            if (data.prefab != null) {
              data.model = data.prefab;
              continue;
            }
            this.prefabs.splice(i, 1);
          }
        };
        _proto.initWithPrefab = function initWithPrefab(prefab) {
          var data = new NodePoolData();
          data.model = prefab;
          this.prefabs.push(data);
        };
        _proto.initWithPrefabByUrl = function initWithPrefabByUrl(url, finishCall, bundle) {
          var _this2 = this;
          if (bundle === void 0) {
            bundle = "resources";
          }
          if (Utils.isDir(url)) ResLoader.instance.loadDir(bundle, url, function (assets) {
            assets.forEach(function (t) {
              return _this2.initWithPrefab(t);
            });
            if (finishCall) finishCall();
          });else ResLoader.instance.load(url, ResType.Prefab, function (asset) {
            _this2.initWithPrefab(asset);
            if (finishCall) finishCall();
          });
        };
        _proto.instantiate = function instantiate$1(prefab, parent) {
          var node = instantiate(prefab);
          node.active = false;
          node.parent = parent;
          return node;
        };
        _proto.get = function get(name, parent, defaulInActive) {
          var data = this.getPrefabData(name);
          if (!data) return;
          if (!this.pool[name]) this.pool[name] = [];
          var node = this.pool[name].find(function (t) {
            return !t.active && isValid(t) && !t.nextframe;
          });
          parent = parent ? parent : data.model.parent;
          parent = parent ? parent : director.getScene();
          if (!node) {
            node = this.instantiate(data.model, parent);
            this.pool[name].push(node);
          } else node.parent = parent;
          if (!defaulInActive) node.active = true;
          return node;
        };
        _proto.back = function back(node) {
          if (isValid(node) && this.pool[node.name]) {
            node.parent = director.getScene();
            node.active = false;
          }
        };
        _proto["delete"] = function _delete(node) {
          if (isValid(node) && this.pool[node.name]) {
            var index = this.pool[node.name].indexOf(node);
            if (index >= 0) {
              this.pool[node.name].splice(index, 1);
              node.removeFromParent();
              node.destroy();
            }
          }
        };
        _proto.clearAll = function clearAll() {
          for (var k in this.pool) {
            for (var _iterator = _createForOfIteratorHelperLoose(this.pool[k]), _step; !(_step = _iterator()).done;) {
              var t = _step.value;
              if (isValid(t)) t.destroy();
            }
          }
          this.pool = [];
        };
        _proto.clearPool = function clearPool(name) {
          if (this.pool[name]) {
            this.pool[name].forEach(function (t) {
              if (isValid(t)) t.destroy();
            });
            delete this.pool[name];
          }
        };
        _proto.getPrefabData = function getPrefabData(name) {
          return this.prefabs.find(function (t) {
            return t.model.name == name;
          });
        };
        _proto.getAllActivedNode = function getAllActivedNode(key) {
          if (this.pool[key]) {
            var nodes = this.pool[key];
            return nodes.filter(function (t) {
              return t.active;
            });
          }
          return [];
        };
        return NodePoolComponent;
      }(Component), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "prefabs", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class5)) || _class4) || _class4));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NodePoolManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NodePoolComponent.ts', './Singleton.ts'], function (exports) {
  var _inheritsLoose, cclegacy, NodePoolComponent, Singleton;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NodePoolComponent = module.default;
    }, function (module) {
      Singleton = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cff50gPHChPx7W+H5sFIxWi", "NodePoolManager", undefined); //对象池管理器
      var NodePoolManager = exports('default', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(NodePoolManager, _Singleton);
        function NodePoolManager() {
          return _Singleton.apply(this, arguments) || this;
        }
        var _proto = NodePoolManager.prototype;
        _proto.create = function create(poolNode, objName, parent, defaulInActive) {
          var pool = poolNode.getComponent(NodePoolComponent);
          return pool == null ? void 0 : pool.get(objName, parent, defaulInActive);
        };
        _proto.recycle = function recycle(poolNode, obj) {
          var pool = poolNode.getComponent(NodePoolComponent);
          pool == null || pool.back(obj);
        };
        _proto["delete"] = function _delete(poolNode, obj) {
          var pool = poolNode.getComponent(NodePoolComponent);
          pool == null || pool["delete"](obj);
        };
        return NodePoolManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PersistentNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "87e8aVOgPxMs4A3KWJeXJrC", "PersistentNode", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var PersistentNode = exports('default', (_dec = menu("1-Other/PersistentNode"), ccclass(_class = _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PersistentNode, _Component);
        function PersistentNode() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = PersistentNode.prototype;
        _proto.onLoad = function onLoad() {
          director.addPersistRootNode(this.node);
        };
        return PersistentNode;
      }(Component)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/protobuf_game.js", ['./cjs-loader.mjs'], function (exports, module) {
  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);
      var _cjsExports;
      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE

        var $Reader = protobuf.Reader,
          $Writer = protobuf.Writer,
          $util = protobuf.util,
          $root = protobuf.roots.creator || (protobuf.roots.creator = $util.global);
        $root.OPReward = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.type = 0, t.prototype.count = 0, t.prototype.targetId = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.targetName = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.type && Object.hasOwnProperty.call(t, "type") && e.uint32(8).int32(t.type), null != t.count && Object.hasOwnProperty.call(t, "count") && e.uint32(16).int32(t.count), null != t.targetId && Object.hasOwnProperty.call(t, "targetId") && e.uint32(24).int64(t.targetId), null != t.targetName && Object.hasOwnProperty.call(t, "targetName") && e.uint32(34).string(t.targetName), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPReward(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.type = t.int32();
                  break;
                case 2:
                  n.count = t.int32();
                  break;
                case 3:
                  n.targetId = t.int64();
                  break;
                case 4:
                  n.targetName = t.string();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPRollDice = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.diceMultiple = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.diceMultiple && Object.hasOwnProperty.call(t, "diceMultiple") && e.uint32(8).int32(t.diceMultiple), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPRollDice(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.diceMultiple = t.int32() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPRollDiceRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.diceMultiple = 0, t.prototype.type = 0, t.prototype.currentPostion = 0, t.prototype.diceCount = 0, t.prototype.reward = null, t.prototype.newPostion = 0, t.prototype.maxStorey = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.diceMultiple && Object.hasOwnProperty.call(t, "diceMultiple") && e.uint32(8).int32(t.diceMultiple), null != t.type && Object.hasOwnProperty.call(t, "type") && e.uint32(16).int32(t.type), null != t.currentPostion && Object.hasOwnProperty.call(t, "currentPostion") && e.uint32(24).int32(t.currentPostion), null != t.diceCount && Object.hasOwnProperty.call(t, "diceCount") && e.uint32(32).int32(t.diceCount), null != t.reward && Object.hasOwnProperty.call(t, "reward") && $root.OPReward.encode(t.reward, e.uint32(42).fork()).ldelim(), null != t.newPostion && Object.hasOwnProperty.call(t, "newPostion") && e.uint32(48).int32(t.newPostion), null != t.maxStorey && Object.hasOwnProperty.call(t, "maxStorey") && e.uint32(56).int32(t.maxStorey), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPRollDiceRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.diceMultiple = t.int32();
                  break;
                case 2:
                  n.type = t.int32();
                  break;
                case 3:
                  n.currentPostion = t.int32();
                  break;
                case 4:
                  n.diceCount = t.int32();
                  break;
                case 5:
                  n.reward = $root.OPReward.decode(t, t.uint32());
                  break;
                case 6:
                  n.newPostion = t.int32();
                  break;
                case 7:
                  n.maxStorey = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPCreateBuild = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.currentStorey = 0, t.prototype.buildPostion = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.currentStorey && Object.hasOwnProperty.call(t, "currentStorey") && e.uint32(8).int32(t.currentStorey), null != t.buildPostion && Object.hasOwnProperty.call(t, "buildPostion") && e.uint32(16).int32(t.buildPostion), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPCreateBuild(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.currentStorey = t.int32();
                  break;
                case 2:
                  n.buildPostion = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPCreateBuildRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.currentStorey = 0, t.prototype.isStoreyUp = !1, t.prototype.buildPostion = 0, t.prototype.buildId = 0, t.prototype.isBuildUp = !1, t.prototype.soulCount = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.currentBuildCount = 0, t.prototype.totalBuildCount = 0, t.prototype.roleIdSkin = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.currentStorey && Object.hasOwnProperty.call(t, "currentStorey") && e.uint32(8).int32(t.currentStorey), null != t.isStoreyUp && Object.hasOwnProperty.call(t, "isStoreyUp") && e.uint32(16).bool(t.isStoreyUp), null != t.buildPostion && Object.hasOwnProperty.call(t, "buildPostion") && e.uint32(24).int32(t.buildPostion), null != t.buildId && Object.hasOwnProperty.call(t, "buildId") && e.uint32(32).int32(t.buildId), null != t.isBuildUp && Object.hasOwnProperty.call(t, "isBuildUp") && e.uint32(40).bool(t.isBuildUp), null != t.soulCount && Object.hasOwnProperty.call(t, "soulCount") && e.uint32(48).int64(t.soulCount), null != t.currentBuildCount && Object.hasOwnProperty.call(t, "currentBuildCount") && e.uint32(56).int32(t.currentBuildCount), null != t.totalBuildCount && Object.hasOwnProperty.call(t, "totalBuildCount") && e.uint32(64).int32(t.totalBuildCount), null != t.roleIdSkin && Object.hasOwnProperty.call(t, "roleIdSkin") && e.uint32(72).int32(t.roleIdSkin), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPCreateBuildRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.currentStorey = t.int32();
                  break;
                case 2:
                  n.isStoreyUp = t.bool();
                  break;
                case 3:
                  n.buildPostion = t.int32();
                  break;
                case 4:
                  n.buildId = t.int32();
                  break;
                case 5:
                  n.isBuildUp = t.bool();
                  break;
                case 6:
                  n.soulCount = t.int64();
                  break;
                case 7:
                  n.currentBuildCount = t.int32();
                  break;
                case 8:
                  n.totalBuildCount = t.int32();
                  break;
                case 9:
                  n.roleIdSkin = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPStoreyInfo = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.postion = 0, t.prototype.buildId = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.postion && Object.hasOwnProperty.call(t, "postion") && e.uint32(8).int32(t.postion), null != t.buildId && Object.hasOwnProperty.call(t, "buildId") && e.uint32(16).int32(t.buildId), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPStoreyInfo(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.postion = t.int32();
                  break;
                case 2:
                  n.buildId = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPGetBuildStorey = function () {
          function t(t) {
            if (this.currentStorey = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.targetId = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.currentStorey = $util.emptyArray, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.targetId && Object.hasOwnProperty.call(t, "targetId") && e.uint32(8).int64(t.targetId), null != t.currentStorey && t.currentStorey.length) {
              e.uint32(18).fork();
              for (var r = 0; r < t.currentStorey.length; ++r) e.int32(t.currentStorey[r]);
              e.ldelim();
            }
            return e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPGetBuildStorey(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.targetId = t.int64();
                  break;
                case 2:
                  if (n.currentStorey && n.currentStorey.length || (n.currentStorey = []), 2 == (7 & o)) for (var i = t.uint32() + t.pos; t.pos < i;) n.currentStorey.push(t.int32());else n.currentStorey.push(t.int32());
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPBuildStoreyInfo = function () {
          function t(t) {
            if (this.storeyInfos = [], this.rebuildPostions = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.currentStorey = 0, t.prototype.storeyInfos = $util.emptyArray, t.prototype.rebuildPostions = $util.emptyArray, t.prototype.goldCoin = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.currentStorey && Object.hasOwnProperty.call(t, "currentStorey") && e.uint32(8).int32(t.currentStorey), null != t.storeyInfos && t.storeyInfos.length) for (var r = 0; r < t.storeyInfos.length; ++r) $root.OPStoreyInfo.encode(t.storeyInfos[r], e.uint32(18).fork()).ldelim();
            if (null != t.rebuildPostions && t.rebuildPostions.length) {
              e.uint32(26).fork();
              for (r = 0; r < t.rebuildPostions.length; ++r) e.int32(t.rebuildPostions[r]);
              e.ldelim();
            }
            return null != t.goldCoin && Object.hasOwnProperty.call(t, "goldCoin") && e.uint32(32).int64(t.goldCoin), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPBuildStoreyInfo(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.currentStorey = t.int32();
                  break;
                case 2:
                  n.storeyInfos && n.storeyInfos.length || (n.storeyInfos = []), n.storeyInfos.push($root.OPStoreyInfo.decode(t, t.uint32()));
                  break;
                case 3:
                  if (n.rebuildPostions && n.rebuildPostions.length || (n.rebuildPostions = []), 2 == (7 & o)) for (var i = t.uint32() + t.pos; t.pos < i;) n.rebuildPostions.push(t.int32());else n.rebuildPostions.push(t.int32());
                  break;
                case 4:
                  n.goldCoin = t.int64();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPGetBuildStoreyRet = function () {
          function t(t) {
            if (this.buildStoreys = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.targetId = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.buildStoreys = $util.emptyArray, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.targetId && Object.hasOwnProperty.call(t, "targetId") && e.uint32(8).int64(t.targetId), null != t.buildStoreys && t.buildStoreys.length) for (var r = 0; r < t.buildStoreys.length; ++r) $root.OPBuildStoreyInfo.encode(t.buildStoreys[r], e.uint32(18).fork()).ldelim();
            return e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPGetBuildStoreyRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.targetId = t.int64();
                  break;
                case 2:
                  n.buildStoreys && n.buildStoreys.length || (n.buildStoreys = []), n.buildStoreys.push($root.OPBuildStoreyInfo.decode(t, t.uint32()));
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPReBuild = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.version = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.version && Object.hasOwnProperty.call(t, "version") && e.uint32(10).string(t.version), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPReBuild(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.version = t.string() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPReBuildRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.buildStoreys = null, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.buildStoreys && Object.hasOwnProperty.call(t, "buildStoreys") && $root.OPBuildStoreyInfo.encode(t.buildStoreys, e.uint32(10).fork()).ldelim(), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPReBuildRet(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.buildStoreys = $root.OPBuildStoreyInfo.decode(t, t.uint32()) : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPIntrusion = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.targetId = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.postion = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.targetId && Object.hasOwnProperty.call(t, "targetId") && e.uint32(8).int64(t.targetId), null != t.postion && Object.hasOwnProperty.call(t, "postion") && e.uint32(16).int32(t.postion), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPIntrusion(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.targetId = t.int64();
                  break;
                case 2:
                  n.postion = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPIntrusionRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.postion = 0, t.prototype.goldCount = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.postion && Object.hasOwnProperty.call(t, "postion") && e.uint32(8).int32(t.postion), null != t.goldCount && Object.hasOwnProperty.call(t, "goldCount") && e.uint32(16).int64(t.goldCount), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPIntrusionRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.postion = t.int32();
                  break;
                case 2:
                  n.goldCount = t.int64();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPSuit = function () {
          function t(t) {
            if (this.group = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.group = $util.emptyArray, t.prototype.suitId = 0, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.group && t.group.length) for (var r = 0; r < t.group.length; ++r) $root.OPGroup.encode(t.group[r], e.uint32(10).fork()).ldelim();
            return null != t.suitId && Object.hasOwnProperty.call(t, "suitId") && e.uint32(16).int32(t.suitId), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPSuit(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.group && n.group.length || (n.group = []), n.group.push($root.OPGroup.decode(t, t.uint32()));
                  break;
                case 2:
                  n.suitId = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPGroup = function () {
          function t(t) {
            if (this.cards = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.cards = $util.emptyArray, t.prototype.level = 0, t.prototype.status = 0, t.prototype.groupType = 0, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.cards && t.cards.length) for (var r = 0; r < t.cards.length; ++r) $root.OPCard.encode(t.cards[r], e.uint32(10).fork()).ldelim();
            return null != t.level && Object.hasOwnProperty.call(t, "level") && e.uint32(16).int32(t.level), null != t.status && Object.hasOwnProperty.call(t, "status") && e.uint32(24).int32(t.status), null != t.groupType && Object.hasOwnProperty.call(t, "groupType") && e.uint32(32).int32(t.groupType), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPGroup(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.cards && n.cards.length || (n.cards = []), n.cards.push($root.OPCard.decode(t, t.uint32()));
                  break;
                case 2:
                  n.level = t.int32();
                  break;
                case 3:
                  n.status = t.int32();
                  break;
                case 4:
                  n.groupType = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPCard = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.cardId = 0, t.prototype.level = 0, t.prototype.isHave = !1, t.prototype.dbId = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.isMax = !1, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.cardId && Object.hasOwnProperty.call(t, "cardId") && e.uint32(8).int32(t.cardId), null != t.level && Object.hasOwnProperty.call(t, "level") && e.uint32(16).int32(t.level), null != t.isHave && Object.hasOwnProperty.call(t, "isHave") && e.uint32(24).bool(t.isHave), null != t.dbId && Object.hasOwnProperty.call(t, "dbId") && e.uint32(32).int64(t.dbId), null != t.isMax && Object.hasOwnProperty.call(t, "isMax") && e.uint32(40).bool(t.isMax), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPCard(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.cardId = t.int32();
                  break;
                case 2:
                  n.level = t.int32();
                  break;
                case 3:
                  n.isHave = t.bool();
                  break;
                case 4:
                  n.dbId = t.int64();
                  break;
                case 5:
                  n.isMax = t.bool();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPBuff = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.type = 0, t.prototype.level = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.type && Object.hasOwnProperty.call(t, "type") && e.uint32(8).int32(t.type), null != t.level && Object.hasOwnProperty.call(t, "level") && e.uint32(16).int32(t.level), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPBuff(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.type = t.int32();
                  break;
                case 2:
                  n.level = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPGetCardList = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.version = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.version && Object.hasOwnProperty.call(t, "version") && e.uint32(10).string(t.version), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPGetCardList(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.version = t.string() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPGetCardListRet = function () {
          function t(t) {
            if (this.suits = [], this.buffs = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.suits = $util.emptyArray, t.prototype.buffs = $util.emptyArray, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.suits && t.suits.length) for (var r = 0; r < t.suits.length; ++r) $root.OPSuit.encode(t.suits[r], e.uint32(10).fork()).ldelim();
            if (null != t.buffs && t.buffs.length) for (r = 0; r < t.buffs.length; ++r) $root.OPBuff.encode(t.buffs[r], e.uint32(18).fork()).ldelim();
            return e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPGetCardListRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.suits && n.suits.length || (n.suits = []), n.suits.push($root.OPSuit.decode(t, t.uint32()));
                  break;
                case 2:
                  n.buffs && n.buffs.length || (n.buffs = []), n.buffs.push($root.OPBuff.decode(t, t.uint32()));
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPDrawCards = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.count = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.count && Object.hasOwnProperty.call(t, "count") && e.uint32(8).int32(t.count), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPDrawCards(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.count = t.int32() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPDrawCardsRet = function () {
          function t(t) {
            if (this.newCardIds = [], this.recoveryCardIds = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.newCardIds = $util.emptyArray, t.prototype.recoveryCardIds = $util.emptyArray, t.prototype.recoverySoul = 0, t.prototype.consumeSoul = 0, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.newCardIds && t.newCardIds.length) {
              e.uint32(10).fork();
              for (var r = 0; r < t.newCardIds.length; ++r) e.int32(t.newCardIds[r]);
              e.ldelim();
            }
            if (null != t.recoveryCardIds && t.recoveryCardIds.length) {
              e.uint32(18).fork();
              for (r = 0; r < t.recoveryCardIds.length; ++r) e.int32(t.recoveryCardIds[r]);
              e.ldelim();
            }
            return null != t.recoverySoul && Object.hasOwnProperty.call(t, "recoverySoul") && e.uint32(24).int32(t.recoverySoul), null != t.consumeSoul && Object.hasOwnProperty.call(t, "consumeSoul") && e.uint32(32).int32(t.consumeSoul), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPDrawCardsRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  if (n.newCardIds && n.newCardIds.length || (n.newCardIds = []), 2 == (7 & o)) for (var i = t.uint32() + t.pos; t.pos < i;) n.newCardIds.push(t.int32());else n.newCardIds.push(t.int32());
                  break;
                case 2:
                  if (n.recoveryCardIds && n.recoveryCardIds.length || (n.recoveryCardIds = []), 2 == (7 & o)) for (i = t.uint32() + t.pos; t.pos < i;) n.recoveryCardIds.push(t.int32());else n.recoveryCardIds.push(t.int32());
                  break;
                case 3:
                  n.recoverySoul = t.int32();
                  break;
                case 4:
                  n.consumeSoul = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPCardUp = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.dbId = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.dbId && Object.hasOwnProperty.call(t, "dbId") && e.uint32(8).int64(t.dbId), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPCardUp(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.dbId = t.int64() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPCardUpRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.cardId = 0, t.prototype.level = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.cardId && Object.hasOwnProperty.call(t, "cardId") && e.uint32(8).int32(t.cardId), null != t.level && Object.hasOwnProperty.call(t, "level") && e.uint32(16).int32(t.level), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPCardUpRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.cardId = t.int32();
                  break;
                case 2:
                  n.level = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPCardGroupStatus = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.suitId = 0, t.prototype.groupType = 0, t.prototype.type = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.suitId && Object.hasOwnProperty.call(t, "suitId") && e.uint32(8).int32(t.suitId), null != t.groupType && Object.hasOwnProperty.call(t, "groupType") && e.uint32(16).int32(t.groupType), null != t.type && Object.hasOwnProperty.call(t, "type") && e.uint32(24).int32(t.type), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPCardGroupStatus(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.suitId = t.int32();
                  break;
                case 2:
                  n.groupType = t.int32();
                  break;
                case 3:
                  n.type = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPCardGroupStatusRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.suitId = 0, t.prototype.groupType = 0, t.prototype.type = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.suitId && Object.hasOwnProperty.call(t, "suitId") && e.uint32(8).int32(t.suitId), null != t.groupType && Object.hasOwnProperty.call(t, "groupType") && e.uint32(16).int32(t.groupType), null != t.type && Object.hasOwnProperty.call(t, "type") && e.uint32(24).int32(t.type), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPCardGroupStatusRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.suitId = t.int32();
                  break;
                case 2:
                  n.groupType = t.int32();
                  break;
                case 3:
                  n.type = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPErrorInfo = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.code = 0, t.prototype.msg = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.code && Object.hasOwnProperty.call(t, "code") && e.uint32(8).sint32(t.code), null != t.msg && Object.hasOwnProperty.call(t, "msg") && e.uint32(18).string(t.msg), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPErrorInfo(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.code = t.sint32();
                  break;
                case 2:
                  n.msg = t.string();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.PushBaseInfo = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.soulCount = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.goldCoin = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.shieldCount = 0, t.prototype.currentDiceCount = 0, t.prototype.totalDiceCount = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.soulCount && Object.hasOwnProperty.call(t, "soulCount") && e.uint32(8).int64(t.soulCount), null != t.goldCoin && Object.hasOwnProperty.call(t, "goldCoin") && e.uint32(16).int64(t.goldCoin), null != t.shieldCount && Object.hasOwnProperty.call(t, "shieldCount") && e.uint32(24).int32(t.shieldCount), null != t.currentDiceCount && Object.hasOwnProperty.call(t, "currentDiceCount") && e.uint32(32).int32(t.currentDiceCount), null != t.totalDiceCount && Object.hasOwnProperty.call(t, "totalDiceCount") && e.uint32(40).int32(t.totalDiceCount), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.PushBaseInfo(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.soulCount = t.int64();
                  break;
                case 2:
                  n.goldCoin = t.int64();
                  break;
                case 3:
                  n.shieldCount = t.int32();
                  break;
                case 4:
                  n.currentDiceCount = t.int32();
                  break;
                case 5:
                  n.totalDiceCount = t.int32();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPLogin = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.token = "", t.prototype.version = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.token && Object.hasOwnProperty.call(t, "token") && e.uint32(10).string(t.token), null != t.version && Object.hasOwnProperty.call(t, "version") && e.uint32(18).string(t.version), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPLogin(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.token = t.string();
                  break;
                case 2:
                  n.version = t.string();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPLoginRet = function () {
          function t(t) {
            if (this.ownRoleIds = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.playerId = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.soulCount = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.goldCoin = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.prototype.shieldCount = 0, t.prototype.currentDiceCount = 0, t.prototype.totalDiceCount = 0, t.prototype.diceMultiple = 0, t.prototype.currentBuildCount = 0, t.prototype.totalBuildCount = 0, t.prototype.currentStorey = 0, t.prototype.nickName = "", t.prototype.avatarNo = 0, t.prototype.currentRoleId = 0, t.prototype.currentRolePostion = 0, t.prototype.ownRoleIds = $util.emptyArray, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.playerId && Object.hasOwnProperty.call(t, "playerId") && e.uint32(8).int64(t.playerId), null != t.soulCount && Object.hasOwnProperty.call(t, "soulCount") && e.uint32(16).int64(t.soulCount), null != t.goldCoin && Object.hasOwnProperty.call(t, "goldCoin") && e.uint32(24).int64(t.goldCoin), null != t.shieldCount && Object.hasOwnProperty.call(t, "shieldCount") && e.uint32(32).int32(t.shieldCount), null != t.currentDiceCount && Object.hasOwnProperty.call(t, "currentDiceCount") && e.uint32(40).int32(t.currentDiceCount), null != t.totalDiceCount && Object.hasOwnProperty.call(t, "totalDiceCount") && e.uint32(48).int32(t.totalDiceCount), null != t.diceMultiple && Object.hasOwnProperty.call(t, "diceMultiple") && e.uint32(56).int32(t.diceMultiple), null != t.currentBuildCount && Object.hasOwnProperty.call(t, "currentBuildCount") && e.uint32(64).int32(t.currentBuildCount), null != t.totalBuildCount && Object.hasOwnProperty.call(t, "totalBuildCount") && e.uint32(72).int32(t.totalBuildCount), null != t.currentStorey && Object.hasOwnProperty.call(t, "currentStorey") && e.uint32(80).int32(t.currentStorey), null != t.nickName && Object.hasOwnProperty.call(t, "nickName") && e.uint32(90).string(t.nickName), null != t.avatarNo && Object.hasOwnProperty.call(t, "avatarNo") && e.uint32(96).int32(t.avatarNo), null != t.currentRoleId && Object.hasOwnProperty.call(t, "currentRoleId") && e.uint32(104).int32(t.currentRoleId), null != t.currentRolePostion && Object.hasOwnProperty.call(t, "currentRolePostion") && e.uint32(112).int32(t.currentRolePostion), null != t.ownRoleIds && t.ownRoleIds.length) {
              e.uint32(122).fork();
              for (var r = 0; r < t.ownRoleIds.length; ++r) e.int32(t.ownRoleIds[r]);
              e.ldelim();
            }
            return e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPLoginRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.playerId = t.int64();
                  break;
                case 2:
                  n.soulCount = t.int64();
                  break;
                case 3:
                  n.goldCoin = t.int64();
                  break;
                case 4:
                  n.shieldCount = t.int32();
                  break;
                case 5:
                  n.currentDiceCount = t.int32();
                  break;
                case 6:
                  n.totalDiceCount = t.int32();
                  break;
                case 7:
                  n.diceMultiple = t.int32();
                  break;
                case 8:
                  n.currentBuildCount = t.int32();
                  break;
                case 9:
                  n.totalBuildCount = t.int32();
                  break;
                case 10:
                  n.currentStorey = t.int32();
                  break;
                case 11:
                  n.nickName = t.string();
                  break;
                case 12:
                  n.avatarNo = t.int32();
                  break;
                case 13:
                  n.currentRoleId = t.int32();
                  break;
                case 14:
                  n.currentRolePostion = t.int32();
                  break;
                case 15:
                  if (n.ownRoleIds && n.ownRoleIds.length || (n.ownRoleIds = []), 2 == (7 & o)) for (var i = t.uint32() + t.pos; t.pos < i;) n.ownRoleIds.push(t.int32());else n.ownRoleIds.push(t.int32());
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPUpdateNickName = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.nickName = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.nickName && Object.hasOwnProperty.call(t, "nickName") && e.uint32(10).string(t.nickName), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPUpdateNickName(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.nickName = t.string() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPUpdateNickNameRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.nickName = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.nickName && Object.hasOwnProperty.call(t, "nickName") && e.uint32(10).string(t.nickName), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPUpdateNickNameRet(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.nickName = t.string() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPUpdateAvatar = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.avatarNo = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.avatarNo && Object.hasOwnProperty.call(t, "avatarNo") && e.uint32(8).int32(t.avatarNo), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPUpdateAvatar(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.avatarNo = t.int32() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPUpdateAvatarRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.avatarNo = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.avatarNo && Object.hasOwnProperty.call(t, "avatarNo") && e.uint32(8).int32(t.avatarNo), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPUpdateAvatarRet(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.avatarNo = t.int32() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPHeartBeat = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.version = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.version && Object.hasOwnProperty.call(t, "version") && e.uint32(10).string(t.version), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPHeartBeat(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.version = t.string() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPHeartBeatRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.time = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.time && Object.hasOwnProperty.call(t, "time") && e.uint32(8).int64(t.time), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPHeartBeatRet(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.time = t.int64() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPSoulRank = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.version = "", t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.version && Object.hasOwnProperty.call(t, "version") && e.uint32(10).string(t.version), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPSoulRank(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.version = t.string() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPSoulRankRet = function () {
          function t(t) {
            if (this.rankInfos = [], t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.myRank = 0, t.prototype.rankInfos = $util.emptyArray, t.encode = function (t, e) {
            if (e = e || $Writer.create(), null != t.myRank && Object.hasOwnProperty.call(t, "myRank") && e.uint32(8).int32(t.myRank), null != t.rankInfos && t.rankInfos.length) for (var r = 0; r < t.rankInfos.length; ++r) $root.OPRankInfo.encode(t.rankInfos[r], e.uint32(18).fork()).ldelim();
            return e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPSoulRankRet(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.myRank = t.int32();
                  break;
                case 2:
                  n.rankInfos && n.rankInfos.length || (n.rankInfos = []), n.rankInfos.push($root.OPRankInfo.decode(t, t.uint32()));
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPRankInfo = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.rank = 0, t.prototype.name = "", t.prototype.avatarNo = 0, t.prototype.count = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.rank && Object.hasOwnProperty.call(t, "rank") && e.uint32(8).int32(t.rank), null != t.name && Object.hasOwnProperty.call(t, "name") && e.uint32(18).string(t.name), null != t.avatarNo && Object.hasOwnProperty.call(t, "avatarNo") && e.uint32(24).int32(t.avatarNo), null != t.count && Object.hasOwnProperty.call(t, "count") && e.uint32(32).int64(t.count), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPRankInfo(); t.pos < r;) {
              var o = t.uint32();
              switch (o >>> 3) {
                case 1:
                  n.rank = t.int32();
                  break;
                case 2:
                  n.name = t.string();
                  break;
                case 3:
                  n.avatarNo = t.int32();
                  break;
                case 4:
                  n.count = t.int64();
                  break;
                default:
                  t.skipType(7 & o);
              }
            }
            return n;
          }, t;
        }(), $root.OPUpdateRoleId = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.roleId = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.roleId && Object.hasOwnProperty.call(t, "roleId") && e.uint32(8).int32(t.roleId), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPUpdateRoleId(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.roleId = t.int32() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }(), $root.OPUpdateRoleIdRet = function () {
          function t(t) {
            if (t) for (var e = Object.keys(t), r = 0; r < e.length; ++r) null != t[e[r]] && (this[e[r]] = t[e[r]]);
          }
          return t.prototype.roleId = 0, t.encode = function (t, e) {
            return e = e || $Writer.create(), null != t.roleId && Object.hasOwnProperty.call(t, "roleId") && e.uint32(8).int32(t.roleId), e;
          }, t.decode = function (t, e) {
            t instanceof $Reader || (t = $Reader.create(t));
            for (var r = void 0 === e ? t.len : t.pos + e, n = new $root.OPUpdateRoleIdRet(); t.pos < r;) {
              var o = t.uint32();
              o >>> 3 == 1 ? n.roleId = t.int32() : t.skipType(7 & o);
            }
            return n;
          }, t;
        }();

        // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
      }, {});
    }
  };
});

System.register("chunks:///_virtual/protobuf_game.mjs_cjs=&original=.js", ['./protobuf_game.js', './cjs-loader.mjs'], function (exports, module) {
  var __cjsMetaURL, loader;
  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './protobuf_game.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./protobuf_game.js', module.meta.url);
      }
      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/RankView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts', './UserNetRequest.ts', './ListViewComponent.ts', './FriendsDataManager.ts', './SpriteFrameComponent.ts', './AvatarComponent.ts', './GameDataManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, tween, UIOpacity, ViewComponent, UserNetRequest, ListViewComponent, AbsAdapter, FriendsDataManager, SpriteFrameComponent, AvatarComponent, GameDataManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }, function (module) {
      UserNetRequest = module.UserNetRequest;
    }, function (module) {
      ListViewComponent = module.default;
      AbsAdapter = module.AbsAdapter;
    }, function (module) {
      FriendsDataManager = module.FriendsDataManager;
    }, function (module) {
      SpriteFrameComponent = module.default;
    }, function (module) {
      AvatarComponent = module.AvatarComponent;
    }, function (module) {
      GameDataManager = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class2, _class3, _descriptor;
      cclegacy._RF.push({}, "a1086eS/9xCcrP7NR3V4xVc", "RankView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SoulRankListAdapter = /*#__PURE__*/function (_AbsAdapter) {
        _inheritsLoose(SoulRankListAdapter, _AbsAdapter);
        function SoulRankListAdapter(data, view) {
          var _this;
          _this = _AbsAdapter.call(this) || this;
          _this.rankView = void 0;
          _this.rankView = view;
          _this.setDataSet(data);
          return _this;
        }
        var _proto = SoulRankListAdapter.prototype;
        _proto.updateView = function updateView(item, posIndex, data) {
          this.rankView.initSoulItemInfo(item, data);
        };
        return SoulRankListAdapter;
      }(AbsAdapter);
      var RankView = exports('RankView', (_dec = ccclass('RankView'), _dec2 = property([Node]), _dec(_class2 = (_class3 = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(RankView, _ViewComponent);
        function RankView() {
          var _this2;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this2 = _ViewComponent.call.apply(_ViewComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this2, "pages", _descriptor, _assertThisInitialized(_this2));
          _this2.curPage = 0;
          return _this2;
        }
        var _proto2 = RankView.prototype;
        _proto2.start = function start() {
          var _this3 = this;
          this.initSoulItemInfo(this.pages[0].getChildByName("rank-ui-2").getChildByName("item"), this.getMyData());
          var _loop = function _loop(i) {
            var page = _this3.pages[i];
            var tab = page.getChildByName("tab");
            var tabMask = tab.getChildByName("rank-ui-7");
            tabMask.active = i != _this3.curPage;
            tab.on(Node.EventType.TOUCH_END, function () {
              if (_this3.curPage == i) return;
              var lastTab = _this3.pages[_this3.curPage].getChildByName("tab");
              var lastTabMask = lastTab.getChildByName("rank-ui-7");
              lastTabMask.active = true;
              _this3.pages[_this3.curPage].setSiblingIndex(2 - _this3.curPage);
              tween(lastTabMask.getComponent(UIOpacity)).to(0.2, {
                opacity: 255
              }).start();
              tabMask.active = true;
              tabMask.getComponent(UIOpacity).opacity = 255;
              tween(tabMask.getComponent(UIOpacity)).to(0.2, {
                opacity: 0
              }).start();
              _this3.pages[i].setSiblingIndex(2);
              _this3.curPage = i;
            });
          };
          for (var i = 0; i < this.pages.length; i++) {
            _loop(i);
          }
          UserNetRequest.soulRank();
          if (FriendsDataManager.getInstance().soulRankData) this.onSoulRankDataInit(1);
          FriendsDataManager.getInstance().soulRankDataInit.addChangeListener(this.onSoulRankDataInit, this);
        };
        _proto2.onDestroy = function onDestroy() {
          FriendsDataManager.getInstance().soulRankDataInit.removeChangeListener(this.onSoulRankDataInit, this);
        };
        _proto2.onSoulRankDataInit = function onSoulRankDataInit(value) {
          if (value == 1) {
            var listview = this.pages[0].getComponentInChildren(ListViewComponent);
            var myItem = this.pages[0].getChildByName("rank-ui-2").getChildByName("item");
            this.initSoulItemInfo(myItem, this.getMyData());
            listview.setAdapter(new SoulRankListAdapter(FriendsDataManager.getInstance().soulRankData, this));
            FriendsDataManager.getInstance().soulRankDataInit.set(0);
          }
        };
        _proto2.initSoulItemInfo = function initSoulItemInfo(item, data) {
          var labelRank = item.getChildByName("Label").getComponent(Label);
          var iconRank = item.getChildByName("rank-ui-4").getComponent(SpriteFrameComponent);
          var labelNick = item.getChildByName("Label-001").getComponent(Label);
          var labelSoul = item.getChildByName("Label-002").getComponent(Label);
          var avatar = item.getChildByName("avatar").getComponent(AvatarComponent);
          iconRank.node.active = data.rank <= 3;
          labelRank.node.active = !iconRank.node.active;
          if (iconRank.node.active) iconRank.setFrameByIndex(data.rank - 1);
          labelRank.string = data.rank ? data.rank.toString() : "...";
          labelNick.string = data.name;
          labelSoul.string = data.count.toString();
          avatar.changeAvatar(data.avatarNo);
        };
        _proto2.getMyData = function getMyData() {
          return new OPRankInfo({
            rank: FriendsDataManager.getInstance().myRank.cur,
            name: GameDataManager.getInstance().data.nick.cur,
            avatarNo: GameDataManager.getInstance().data.avatar.cur,
            count: GameDataManager.getInstance().data.soul.cur
          });
        };
        return RankView;
      }(ViewComponent), _descriptor = _applyDecoratedDescriptor(_class3.prototype, "pages", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class3)) || _class2));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RebuildHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "21a34kBPchDA63JEVXMdFg3", "RebuildHandler", undefined);
      var RebuildHandler = exports('RebuildHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(RebuildHandler, _NetWorkHandler);
        function RebuildHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = RebuildHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("RebuildHandler!!", this.data);
        };
        return RebuildHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RedPoint.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RedPointCenter.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, Component, RedPointCenter;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      Component = module.Component;
    }, function (module) {
      RedPointCenter = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "43b9coH0QRBZ7rlM+u0FhO5", "RedPoint", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var RedPointComponent = exports('default', (_dec = menu("1-UI/RedPointComponent"), _dec2 = property([CCString]), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RedPointComponent, _Component);
        function RedPointComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "key", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "subKeys", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = RedPointComponent.prototype;
        _proto.onLoad = function onLoad() {
          if (this.key != "") RedPointCenter.instance.addPoint(this);
        };
        _proto.start = function start() {
          RedPointCenter.instance.checkPoint(this);
        };
        _proto.onDestroy = function onDestroy() {
          RedPointCenter.instance.deletePoint(this);
        };
        _proto.setActive = function setActive(enable) {
          this.node.active = enable;
        };
        _proto.setKey = function setKey(key) {
          this.key = key;
          RedPointCenter.instance.addPoint(this);
          RedPointCenter.instance.checkPoint(this);
        };
        return RedPointComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "key", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "subKeys", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RedPointCenter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './GlobalConfig.ts', './RedPointData.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, Component, GlobalEventManager, GlobalEvent, RedPointDataComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }, function (module) {
      RedPointDataComponent = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "3a1c5qjvBpP16bRIwYN71JP", "RedPointCenter", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var RedPointCenter = exports('default', (_dec = menu("1-UI/RedPointCenter"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RedPointCenter, _Component);
        function RedPointCenter() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.pointsArr = {};
          return _this;
        }
        var _proto = RedPointCenter.prototype;
        _proto.onLoad = function onLoad() {
          RedPointCenter.instance = this;
        };
        _proto.start = function start() {
          GlobalEventManager.getInstance().on(GlobalEvent.RedPointNotify, this.onRedPointNotifyListener, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.onRedPointNotifyListener = function onRedPointNotifyListener(_key) {
          var _this2 = this;
          this.checkPointByKey(_key);

          //检测subKey包含了key的红点
          for (var key in this.pointsArr) {
            var points = this.pointsArr[key];
            points.forEach(function (p) {
              if (p.subKeys.indexOf(_key) >= 0) _this2.checkPoint(p);
            });
          }
        };
        _proto.addPoint = function addPoint(p) {
          if (!this.pointsArr[p.key]) this.pointsArr[p.key] = [];
          if (this.pointsArr[p.key].indexOf(p) < 0) this.pointsArr[p.key].push(p);
        };
        _proto.deletePoint = function deletePoint(p) {
          var arrPoints = this.pointsArr[p.key];
          if (!arrPoints) return;
          var index = arrPoints.indexOf(p);
          if (index >= 0) this.pointsArr[p.key].splice(index, 1);
        };
        _proto.checkPointByKey = function checkPointByKey(key) {
          var _this3 = this;
          var _points = this.pointsArr[key];
          if (!_points) return;
          _points.forEach(function (p) {
            return _this3.checkPoint(p);
          });
        };
        _proto.checkPoint = function checkPoint(p) {
          if (RedPointDataComponent.instance.data.notifyKey.indexOf(p.key) >= 0) {
            p.setActive(true);
          } else {
            var ret = false;
            for (var _iterator = _createForOfIteratorHelperLoose(p.subKeys), _step; !(_step = _iterator()).done;) {
              var key = _step.value;
              if (RedPointDataComponent.instance.data.notifyKey.indexOf(key) >= 0) {
                ret = true;
                break;
              }
            }
            p.setActive(ret);
          }
        };
        return RedPointCenter;
      }(Component), _class2.instance = void 0, _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RedPointData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LocalDataComponent.ts', './GlobalEventManager.ts', './GlobalConfig.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, LocalDataComponent, GlobalEventManager, GlobalEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      LocalDataComponent = module.default;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "37c92o0x0xENLi1yf02XfOO", "RedPointData", undefined);
      var RedPointData = function RedPointData() {
        this.notifyKey = [];
      };
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var RedPointDataComponent = exports('default', ccclass(_class = (_class2 = /*#__PURE__*/function (_LocalDataComponent) {
        _inheritsLoose(RedPointDataComponent, _LocalDataComponent);
        function RedPointDataComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _LocalDataComponent.call.apply(_LocalDataComponent, [this].concat(args)) || this;
          _this.key = "RedPointData";
          return _this;
        }
        var _proto = RedPointDataComponent.prototype;
        _proto.defaultInit = function defaultInit() {
          RedPointDataComponent.instance = this;
          return new RedPointData();
        };
        _proto.addNotifyKey = function addNotifyKey(key) {
          if (this.data.notifyKey.indexOf(key) < 0) {
            this.data.notifyKey.push(key);
            this.save();
            GlobalEventManager.getInstance().emit(GlobalEvent.RedPointNotify, key);
            return true;
          }
          return false;
        };
        _proto.deleteNotifyKey = function deleteNotifyKey(key) {
          var index = this.data.notifyKey.indexOf(key);
          if (index >= 0) {
            this.data.notifyKey.splice(index, 1);
            this.save();
            GlobalEventManager.getInstance().emit(GlobalEvent.RedPointNotify, key);
          }
        };
        return RedPointDataComponent;
      }(LocalDataComponent), _class2.instance = void 0, _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResLoader.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, JsonAsset, isValid, assetManager, ParticleAsset, log, SceneAsset, SpriteFrame, Component, sp;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      JsonAsset = module.JsonAsset;
      isValid = module.isValid;
      assetManager = module.assetManager;
      ParticleAsset = module.ParticleAsset;
      log = module.log;
      SceneAsset = module.SceneAsset;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
      sp = module.sp;
    }],
    execute: function () {
      var _dec, _dec2, _class4, _class5, _descriptor, _class6;
      cclegacy._RF.push({}, "c9e77XdjlFMr5SWnenW87WT", "ResLoader", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ResType = exports('ResType', /*#__PURE__*/function (ResType) {
        ResType[ResType["None"] = 0] = "None";
        ResType[ResType["Prefab"] = 1] = "Prefab";
        ResType[ResType["Audio"] = 2] = "Audio";
        ResType[ResType["Image"] = 3] = "Image";
        ResType[ResType["Json"] = 4] = "Json";
        ResType[ResType["Scene"] = 5] = "Scene";
        ResType[ResType["Particle"] = 6] = "Particle";
        ResType[ResType["TileMap"] = 7] = "TileMap";
        return ResType;
      }({}));
      var SpriteFrameData = function SpriteFrameData(name, frame, bundleName) {
        this.name = void 0;
        this.frame = void 0;
        this.bundleName = void 0;
        this.name = name;
        this.frame = frame;
        this.bundleName = bundleName;
      };
      var ResLoader = exports('ResLoader', (_dec = ccclass('ResLoader'), _dec2 = property(JsonAsset), _dec(_class4 = (_class5 = (_class6 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ResLoader, _Component);
        function ResLoader() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "jsonData", _descriptor, _assertThisInitialized(_this));
          _this.data = void 0;
          _this.keys = [null, "prefabs", "audios", "images", "jsons", "scenes", "particle", "tilemap"];
          _this.bundleCache = [];
          _this.assetCache = {};
          _this.frameCache = [];
          return _this;
        }
        var _proto = ResLoader.prototype;
        _proto.onLoad = function onLoad() {
          this.data = this.jsonData.json;
          ResLoader.instance = this;
        };
        _proto.loadSpriteFrame = function loadSpriteFrame(sp, name, successCall, errCall, bundle) {
          var _this2 = this;
          if (!isValid(sp)) return;
          var success = function success(d, uniData) {
            if (!isValid(sp)) return;
            var frameData = _this2.getFrameDataFromCache(name, bundle);
            if (frameData) {
              sp.spriteFrame = frameData.frame;
            } else {
              var frame = SpriteFrame.createWithImage(d);
              sp.spriteFrame = frame;
              _this2.frameCache.push(new SpriteFrameData(name, frame, bundle));
              _this2.addAssets(frame, uniData.bundle);
            }
            if (successCall) successCall(d);
          };
          var frameData = this.getFrameDataFromCache(name, bundle);
          if (frameData) sp.spriteFrame = frameData.frame;else this.load(name, ResType.Image, success, errCall);
        };
        _proto.load = function load(name, resType, successCall, errCall) {
          var _this3 = this;
          var uniData = null;
          if (resType) {
            var uniDatas = this.data[this.keys[resType]];
            uniData = uniDatas.find(function (t) {
              return t.name == name;
            });
          } else {
            for (var k in this.data) {
              var _uniDatas = this.data[k];
              uniData = _uniDatas.find(function (t) {
                return t.name == name;
              });
              if (uniData) break;
            }
          }
          if (uniData) {
            var bundle = assetManager.getBundle(uniData.bundle);
            var callback = function callback(err, d) {
              if (err) {
                log(err);
                if (errCall) errCall(err);
                return;
              } else {
                _this3.addAssets(d, uniData.bundle);
                if (successCall) successCall(d, uniData);
              }
            };
            if (bundle) {
              if (resType && resType == ResType.Particle) bundle.load(uniData.path, ParticleAsset, callback);else bundle.load(uniData.path, callback);
            } else {
              assetManager.loadBundle(uniData.bundle, function (err, _bundle) {
                if (err) {
                  log(err);
                  return;
                }
                if (resType && resType == ResType.Particle) _bundle.load(uniData.path, ParticleAsset, callback);else _bundle.load(uniData.path, callback);
                _this3.bundleCache.push(_bundle.name);
              });
            }
          }
        };
        _proto.loadDir = function loadDir(bundleName, dir, successCall, errCall) {
          var _this4 = this;
          var bundle = assetManager.getBundle(bundleName);
          var callback = function callback(err, d) {
            if (err) {
              log(err);
              if (errCall) errCall(err);
              return;
            } else {
              if (successCall) successCall(d);
            }
          };
          if (bundle) {
            bundle.loadDir(dir, callback);
          } else {
            assetManager.loadBundle(bundleName, function (err, _bundle) {
              if (err) {
                log(err);
                return;
              }
              _bundle.loadDir(dir, callback);
              _this4.bundleCache.push(bundleName);
            });
          }
        };
        _proto.loadBundle = function loadBundle(name, successCall, errCall) {
          var _this5 = this;
          var callback = function callback(err, d) {
            if (err) {
              log(err);
              if (errCall) errCall(err);
              return;
            } else {
              if (successCall) successCall(d);
              _this5.bundleCache.push(name);
            }
          };
          assetManager.loadBundle(name, callback);
        };
        _proto.unloadBundle = function unloadBundle(bundleName) {
          var _this6 = this;
          var bundle = assetManager.getBundle(bundleName);
          if (bundle) {
            var _loop = function _loop(k) {
              var t = _this6.data[k];
              var targetBundleRes = t.filter(function (t) {
                return t.bundle == bundleName;
              });
              if (targetBundleRes) {
                targetBundleRes.forEach(function (t) {
                  bundle.release(t.path);

                  //有效释放静态spine骨骼动画相关联的资源
                  var asset = assetManager.assets.find(function (s) {
                    return s.name == t.name;
                  });
                  if (asset instanceof sp.SkeletonData) assetManager.releaseAsset(asset);
                  if (k == "images") {
                    _this6.frameCache.forEach(function (s) {
                      return s.bundleName == t.bundle;
                    });
                    var index = _this6.frameCache.findIndex(function (s) {
                      return s.bundleName == t.bundle && s.name == t.name;
                    });
                    if (index >= 0) {
                      _this6.frameCache.splice(index, 1);
                    } else {
                      index = _this6.frameCache.findIndex(function (s) {
                        return s.name == t.name;
                      });
                      if (index >= 0) _this6.frameCache.splice(index, 1);
                    }
                  }
                });
              }
            };
            for (var k in this.data) {
              _loop(k);
            }
            this.releaseCachedAssets(bundleName);
            assetManager.removeBundle(bundle);
          }
        };
        _proto.autoUnloadBundles = function autoUnloadBundles(ignoreBundles) {
          if (ignoreBundles === void 0) {
            ignoreBundles = [];
          }
          for (var _iterator = _createForOfIteratorHelperLoose(this.bundleCache), _step; !(_step = _iterator()).done;) {
            var _bundleName = _step.value;
            if (ignoreBundles.indexOf(_bundleName) >= 0) continue;
            this.unloadBundle(_bundleName);
          }
          this.bundleCache = [];
        };
        _proto.loadRemote = function loadRemote(url, successCall, errCall) {
          var callback = function callback(err, d) {
            if (err) {
              log(err);
              if (errCall) errCall(err);
              return;
            } else {
              if (successCall) successCall(d);
            }
          };
          assetManager.loadRemote(url, callback);
        };
        _proto.isSceneLoaded = function isSceneLoaded(scene) {
          var inCache = false;
          for (var k in this.assetCache) {
            if (this.assetCache[k] && this.assetCache[k].findIndex(function (t) {
              return t instanceof SceneAsset && t.name == scene;
            }) >= 0) {
              inCache = true;
              break;
            }
          }
          return this.data.scenes.findIndex(function (t) {
            return t.name == scene;
          }) < 0 || inCache;
        };
        _proto.getFrameDataFromCache = function getFrameDataFromCache(frameName, bundle) {
          for (var i = this.frameCache.length - 1; i >= 0; i--) {
            var data = this.frameCache[i];
            if (bundle && bundle == data.bundleName) {
              if (data.name == frameName) return data;
            } else if (data.name == frameName) {
              return data;
            }
          }
        };
        _proto.addAssets = function addAssets(asset, bundle) {
          if (!this.assetCache[bundle]) this.assetCache[bundle] = [];
          this.assetCache[bundle].push(asset);
        };
        _proto.releaseCachedAssets = function releaseCachedAssets(bundleName) {
          if (bundleName in this.assetCache) {
            this.assetCache[bundleName].forEach(function (data) {
              if (data instanceof SpriteFrame) {
                assetManager.releaseAsset(data.texture);
              }
              assetManager.releaseAsset(data);
            });
          }
          this.assetCache[bundleName] = [];
        };
        return ResLoader;
      }(Component), _class6.instance = void 0, _class6), _descriptor = _applyDecoratedDescriptor(_class5.prototype, "jsonData", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class5)) || _class4));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResPreLoader.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResLoader.ts', './GlobalEventManager.ts', './GlobalConfig.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, JsonAsset, log, Component, ResLoader, ResType, GlobalEventManager, GlobalEvent, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      JsonAsset = module.JsonAsset;
      log = module.log;
      Component = module.Component;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }, function (module) {
      Utils = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class2, _class3, _descriptor, _class4;
      cclegacy._RF.push({}, "ab1bamx54FLkIezV9ZONRma", "ResPreLoader", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ResPreLoader = exports('ResPreLoader', (_dec = ccclass('ResPreLoader'), _dec2 = property(JsonAsset), _dec(_class2 = (_class3 = (_class4 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ResPreLoader, _Component);
        function ResPreLoader() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "jsonData", _descriptor, _assertThisInitialized(_this));
          _this.configsCache = [];
          _this.audiosCache = [];
          _this.config = void 0;
          return _this;
        }
        var _proto = ResPreLoader.prototype;
        _proto.onLoad = function onLoad() {
          ResPreLoader.instance = this;
          this.config = this.jsonData.json;
        };
        _proto.start = function start() {
          GlobalEventManager.getInstance().emit(GlobalEvent.AddPreload, 3);
          this.preloadBundles();
        };
        _proto.update = function update(deltaTime) {};
        _proto.getConfig = function getConfig(name) {
          var data = this.configsCache.find(function (t) {
            return t.uuid.indexOf(name) >= 0;
          });
          if (data) {
            log("优先加载服务器配置", name);
            return data;
          }
          return this.configsCache.find(function (t) {
            return t.name == name;
          });
        };
        _proto.preloadBundles = function preloadBundles() {
          var _this2 = this;
          var cnt = this.config.bundles.length;
          if (cnt) {
            this.config.bundles.forEach(function (bundleName) {
              ResLoader.instance.loadBundle(bundleName, function (t) {
                cnt--;
                if (cnt == 0) _this2.preloadOther();
              });
            });
          } else {
            this.preloadOther();
          }
        };
        _proto.preloadOther = function preloadOther() {
          this.preloadedMark();
          this.preloadConfigs();
          this.preloadAudio();
        };
        _proto.preloadConfigs = function preloadConfigs() {
          var _this3 = this;
          var cnt = this.config.configs.length;
          var callback = function callback(asset) {
            cnt--;
            if (cnt == 0) _this3.preloadedMark();
            if (asset.shift) {
              asset.forEach(function (t) {
                _this3.configsCache.push(t);
              });
            } else {
              _this3.configsCache.push(asset);
            }
          };
          this.config.configs.forEach(function (url) {
            if (Utils.isRemoteUrl(url)) {
              var remoteErr = function remoteErr(err) {
                cnt--;
                if (cnt == 0) _this3.preloadedMark();
              };
              ResLoader.instance.loadRemote(url, callback, remoteErr);
            } else if (Utils.isDir(url)) {
              ResLoader.instance.loadDir("resources", url, callback);
            } else {
              ResLoader.instance.load(url, ResType.Json, callback);
            }
          });
          if (cnt == 0) this.preloadedMark();
        };
        _proto.preloadAudio = function preloadAudio() {
          var _this4 = this;
          var cnt = this.config.audios.length;
          var callback = function callback(asset) {
            if (asset.shift) {
              asset.forEach(function (t) {
                _this4.audiosCache.push(t);
              });
            } else {
              _this4.audiosCache.push(asset);
            }
            cnt--;
            if (cnt == 0) _this4.audioPreloadedMark();
          };
          this.config.audios.forEach(function (url) {
            if (Utils.isRemoteUrl(url)) {
              ResLoader.instance.loadRemote(url, callback);
            } else if (Utils.isDir(url)) {
              ResLoader.instance.loadDir("resources", url, callback);
            } else {
              ResLoader.instance.load(url, ResType.Audio, callback);
            }
          });
          if (cnt == 0) this.audioPreloadedMark();
        };
        _proto.audioPreloadedMark = function audioPreloadedMark() {
          GlobalEventManager.getInstance().emit(GlobalEvent.AudioPreloaded, this.audiosCache);
          this.preloadedMark();
        };
        _proto.preloadedMark = function preloadedMark() {
          GlobalEventManager.getInstance().emit(GlobalEvent.Preloaded);
        };
        return ResPreLoader;
      }(Component), _class4.instance = void 0, _class4), _descriptor = _applyDecoratedDescriptor(_class3.prototype, "jsonData", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class3)) || _class2));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoleConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResPreLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, ResPreLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResPreLoader = module.ResPreLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6b2b2qidfBKuoY+flP6sJUS", "RoleConfig", undefined);
      var RoleConfigData = exports('RoleConfigData', function RoleConfigData() {
        this.id = void 0;
        this.name = void 0;
      });
      var RoleConfig = exports('RoleConfig', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(RoleConfig, _Singleton);
        function RoleConfig() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.data = void 0;
          _this.data = ResPreLoader.instance.getConfig("RoleSkinJson").json;
          return _this;
        }
        var _proto = RoleConfig.prototype;
        _proto.getDataById = function getDataById(id) {
          return this.data.find(function (item) {
            return item.id == id;
          });
        };
        return RoleConfig;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoleSelectPageView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts', './SpriteFrameComponent.ts', './GameDataManager.ts', './SpriteAnimator.ts', './NetComponent.ts', './UserNetRequest.ts', './RoleConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, PageView, Node, instantiate, Label, Sprite, ViewComponent, SpriteFrameComponent, GameDataManager, SpriteAnimator, NetComponent, UserNetRequest, RoleConfig;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      PageView = module.PageView;
      Node = module.Node;
      instantiate = module.instantiate;
      Label = module.Label;
      Sprite = module.Sprite;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }, function (module) {
      SpriteFrameComponent = module.default;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      SpriteAnimator = module.SpriteAnimator;
    }, function (module) {
      NetComponent = module.NetComponent;
    }, function (module) {
      UserNetRequest = module.UserNetRequest;
    }, function (module) {
      RoleConfig = module.RoleConfig;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b0d04+8yx9M9rHFbyYo6aK6", "RoleSelectPageView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RoleSelectPageView = exports('RoleSelectPageView', (_dec = ccclass('RoleSelectPageView'), _dec2 = property(PageView), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(RoleSelectPageView, _ViewComponent);
        function RoleSelectPageView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ViewComponent.call.apply(_ViewComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "pageView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemModel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemPageModel", _descriptor3, _assertThisInitialized(_this));
          _this.pageNum = 6;
          _this.curSelect = 0;
          _this.curPage = 0;
          _this.itemPages = [];
          _this.items = [];
          _this.datas = [1];
          return _this;
        }
        var _proto = RoleSelectPageView.prototype;
        _proto.onLoad = function onLoad() {
          this.itemModel.active = false;
          this.itemPageModel.active = false;
          this.curSelect = GameDataManager.getInstance().data.role.cur - 1;
          this.datas = NetComponent.instance.localDebug ? [1, 2, 3, 4, 5, 6, 7] : GameDataManager.getInstance().owndRoles;
        };
        _proto.start = function start() {
          var page = Math.ceil(this.datas.length / this.pageNum);
          for (var n = 0; n < page; n++) {
            var itemPage = instantiate(this.itemPageModel);
            itemPage.active = true;
            this.pageView.addPage(itemPage);
            this.itemPages.push(itemPage);
            for (var i = 0; i < this.pageNum; i++) {
              var item = instantiate(this.itemModel);
              item.active = true;
              item.parent = itemPage;
              this.items.push(item);
              var index = n * this.pageNum + i;
              this.onItemInit(item, index < this.datas.length ? this.datas[index] : null, index);
            }
          }
          var curPage = Math.floor(this.curSelect / this.pageNum);
          this.pageView.scrollToPage(curPage, 0);
        };
        _proto.onItemInit = function onItemInit(item, data, index) {
          var _this2 = this;
          var labelNick = item.getComponentInChildren(Label);
          var icon = item.getChildByName("role").getComponent(Sprite);
          var frame = item.getChildByName("frame").getComponent(SpriteFrameComponent);
          var cfg = RoleConfig.getInstance().getDataById(data);
          icon.node.active = false;
          icon.node.getComponent(SpriteAnimator).init(data, false);
          if (data) {
            labelNick.string = cfg.name;
            item.targetOff(this);
            item.on(Node.EventType.TOUCH_END, function () {
              if (_this2.curSelect == index) return;
              var lastItem = _this2.items[_this2.curSelect];
              lastItem == null || lastItem.getComponentInChildren(SpriteFrameComponent).setFrameByIndex(0);
              _this2.curSelect = index;
              frame.setFrameByIndex(1);
            }, this);
          } else {
            labelNick.string = "";
          }
          frame.setFrameByIndex(this.curSelect == index ? 1 : 0);
        };
        _proto.onClickSave = function onClickSave() {
          this.close();
          if (GameDataManager.getInstance().data.role.cur == this.datas[this.curSelect]) return;
          if (NetComponent.instance.localDebug) GameDataManager.getInstance().data.role.set(this.datas[this.curSelect]);else UserNetRequest.updateRole(this.datas[this.curSelect]);
        };
        return RoleSelectPageView;
      }(ViewComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pageView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemModel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemPageModel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RollHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Constants.ts', './GameDataManager.ts', './RollLogic.ts', './UIConstant.ts', './NetWorkHandler.ts', './NetComponent.ts', './GameNetRequest.ts'], function (exports) {
  var _inheritsLoose, _assertThisInitialized, cclegacy, log, GlobalEventManager, RollState, RewardType, GridType, GameEvent, GameDataManager, RollLogic, UIEvent, NetWorkHandler, NetComponent, GameNetRequest;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      RollState = module.RollState;
      RewardType = module.RewardType;
      GridType = module.GridType;
      GameEvent = module.GameEvent;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      RollLogic = module.RollLogic;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }, function (module) {
      NetComponent = module.NetComponent;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4fca3FuVa9Gjo4t0+5XD2wI", "RollHandler", undefined);
      var RollHandler = exports('RollHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(RollHandler, _NetWorkHandler);
        function RollHandler(proto, code) {
          var _this;
          _this = _NetWorkHandler.call(this, proto, code) || this;
          _this.data = void 0;
          RollLogic.getInstance().rollState.stateChangeHandler.add(_this.onRollStateListener.bind(_assertThisInitialized(_this)));
          return _this;
        }
        var _proto = RollHandler.prototype;
        _proto.onRollStateListener = function onRollStateListener(state, _, isAdd) {
          if (NetComponent.instance.localDebug) return;

          //角色移动完成后执行
          if (state == RollState.CharacterJumping && !isAdd) {
            this.rewardTypeLogic();
          }

          //整个roll点状态结束时执行，包括角色移动完成
          if (RollLogic.getInstance().rollState.isState(RollState.Idle)) {
            this.gridTypeLogic();
          }
        };
        _proto.onHandler = function onHandler() {
          console.log("RollHandler!!", this.data);
          RollLogic.getInstance().point.set(this.data.diceCount);
          GameDataManager.getInstance().data.pos.set(this.data.currentPostion);
        };
        _proto.rewardTypeLogic = function rewardTypeLogic() {
          switch (this.data.reward.type) {
            case RewardType.Coin:
              GameDataManager.getInstance().data.gold.add(this.data.reward.count);
              GlobalEventManager.getInstance().emit(GameEvent.BoardEffect, 1);
              break;
            case RewardType.Dice:
              break;
            case RewardType.Item:
              break;
            case RewardType.Intrusion:
              if (this.data.type == GridType.Draw) {
                RollLogic.getInstance().stopContinuousRoll();
                GlobalEventManager.getInstance().emit(GameEvent.CharacterJump, this.data.newPostion);
                this.data.type = GridType.Intrusion;
              }
              break;
          }
        };
        _proto.gridTypeLogic = function gridTypeLogic() {
          switch (this.data.type) {
            case GridType.Coin:
              GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
              break;
            case GridType.Intrusion:
              RollLogic.getInstance().stopContinuousRoll();
              this.invasionTargetInfoReq();
              RollLogic.getInstance().intrusionAnimState.setState(1);
              GlobalEventManager.getInstance().emit(GameEvent.BoardEffect, 2);
              break;
            case GridType.Draw:
              GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
              break;
            case GridType.Item:
              GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
              break;
            case GridType.Community:
              GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
              break;
          }
        };
        _proto.invasionTargetInfoReq = function invasionTargetInfoReq() {
          var storeys = [];
          var len = Math.min(3, this.data.maxStorey);
          for (var i = 0; i < len; i++) {
            storeys.push(this.data.maxStorey - i);
          }
          GameDataManager.getInstance().invasionTarget = this.data.reward.targetId;
          GameDataManager.getInstance().invasionTargetNick = this.data.reward.targetName;
          log(storeys, this.data.reward.targetId, this.data.reward.targetName);
          GameNetRequest.getBuildingInfo(storeys, this.data.reward.targetId);
        };
        return RollHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RollLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ExInteger.ts', './GlobalEventManager.ts', './UIConstant.ts', './GameDataManager.ts', './SwitchState.ts', './NetComponent.ts', './GameNetRequest.ts', './GameLocalData.ts', './GlobalConfig.ts', './Constants.ts', './ViewPortFollow.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Singleton, ExInteger, GlobalEventManager, UIEvent, GameDataManager, SwitchState, NetComponent, GameNetRequest, GameLocalData, GlobalConstant, RollState, AssetCode, ViewPortFollow;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ExInteger = module.default;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      SwitchState = module.SwitchState;
    }, function (module) {
      NetComponent = module.NetComponent;
    }, function (module) {
      GameNetRequest = module.GameNetRequest;
    }, function (module) {
      GameLocalData = module.default;
    }, function (module) {
      GlobalConstant = module.GlobalConstant;
    }, function (module) {
      RollState = module.RollState;
      AssetCode = module.AssetCode;
    }, function (module) {
      ViewPortFollow = module.ViewPortFollow;
    }],
    execute: function () {
      cclegacy._RF.push({}, "31850ma3hNPy6UJXufwRBY6", "RollLogic", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RollLogic = exports('RollLogic', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(RollLogic, _Singleton);
        function RollLogic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this.inContinuous = new ExInteger().init(0);
          _this.rollState = new SwitchState();
          _this.intrusionAnimState = new SwitchState();
          _this.point = new ExInteger().init(0);
          return _this;
        }
        var _proto = RollLogic.prototype;
        _proto.roll = function roll() {
          if (!GameDataManager.getInstance().isDiceEnough()) {
            GlobalConstant.showFloatingTip("dice not enough!");
            return;
          }
          this.rollState.addState(RollState.Rolling);
          GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, true);
          ViewPortFollow.canUpdate.set(1);
          if (!NetComponent.instance.localDebug) {
            GameDataManager.getInstance().data.dice.add(-GameLocalData.instance.data.multi.cur);
            setTimeout(function () {
              return GameNetRequest.roll(GameLocalData.instance.data.multi.cur);
            }, 600);
          } else {
            if (!GameDataManager.getInstance().useDice()) {
              return;
            }
            GameDataManager.getInstance().setDicePoint();
            GlobalEventManager.getInstance().emit(UIEvent.CacheReward, AssetCode.Gold, 2000, true);
            setTimeout(function () {
              GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
            }, 1790);

            //debug
            // setTimeout(() => {
            //     GameDataManager.getInstance().invasion.set(1);
            // }, 2000);
          }
        };

        _proto.continuousRoll = function continuousRoll() {
          this.inContinuous.set(1);
          this.roll();
        };
        _proto.stopContinuousRoll = function stopContinuousRoll() {
          this.inContinuous.set(0);
        };
        return RollLogic;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SceneManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './ResLoader.ts', './Handlers.ts'], function (exports) {
  var _inheritsLoose, cclegacy, director, log, Singleton, ResLoader, ResType, Handlers;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      log = module.log;
    }, function (module) {
      Singleton = module.default;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }, function (module) {
      Handlers = module.Handlers;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c7b2asKj1pJGa1tDsEzgj6g", "SceneManager", undefined);
      var SceneManager = exports('default', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(SceneManager, _Singleton);
        function SceneManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this.loadedHandler = new Handlers();
          _this.inLoading = false;
          return _this;
        }
        var _proto = SceneManager.prototype;
        _proto.loadScene = function loadScene(name, sceneLoadedCall, errCall) {
          var _this2 = this;
          if (this.inLoading) return;
          var loadedCall = function loadedCall(err, scene) {
            _this2.inLoading = false;
            if (err) {
              log(err);
              if (errCall) errCall(err);
              return;
            }
            if (sceneLoadedCall) sceneLoadedCall(scene);
            _this2.loadedHandler.emit(scene);
          };
          this.inLoading = true;
          if (ResLoader.instance.isSceneLoaded(name)) director.loadScene(name, loadedCall);else this.loadBundleScene(name, loadedCall);
        };
        _proto.loadBundleScene = function loadBundleScene(name, loadedCall) {
          ResLoader.instance.load(name, ResType.Scene, function (asset) {
            director.loadScene(name, loadedCall);
          });
        };
        return SceneManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SettingView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UserSettingComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Toggle, Slider, Component, UserSettingComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Toggle = module.Toggle;
      Slider = module.Slider;
      Component = module.Component;
    }, function (module) {
      UserSettingComponent = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "83a3ea6LEpMNpOb3XWuaUZv", "SettingView", undefined);
      // import AdManager from "../../../cocos-multi-platform/AdManager";

      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SettingView = exports('default', (_dec = property(Toggle), _dec2 = property(Toggle), _dec3 = property(Toggle), _dec4 = property(Slider), _dec5 = property(Slider), ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SettingView, _Component);
        function SettingView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "toggleMusic", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toggleSfx", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toggleVibrate", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sliderMusic", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sliderSfx", _descriptor5, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = SettingView.prototype;
        _proto.start = function start() {
          var _this2 = this;
          UserSettingComponent.instance.data.musicVolume.addChangeListener(this.onVolumeChangeLisetner, this);
          UserSettingComponent.instance.data.sfxVolume.addChangeListener(this.onVolumeChangeLisetner, this);
          UserSettingComponent.instance.data.musicMute.addChangeListener(this.onMuteChangeListener, this);
          UserSettingComponent.instance.data.sfxMute.addChangeListener(this.onMuteChangeListener, this);
          UserSettingComponent.instance.data.vibrate.addChangeListener(this.onVibrateListener, this);
          this.scheduleOnce(function () {
            _this2.updateView(true);
          }, 0.1);
          this.toggleMusic.setIsCheckedWithoutNotify(!UserSettingComponent.instance.data.musicMute);
          this.toggleSfx.setIsCheckedWithoutNotify(!UserSettingComponent.instance.data.sfxMute);
        };
        _proto.onDestroy = function onDestroy() {
          UserSettingComponent.instance.data.musicVolume.removeChangeListener(this.onVolumeChangeLisetner, this);
          UserSettingComponent.instance.data.sfxVolume.removeChangeListener(this.onVolumeChangeLisetner, this);
          UserSettingComponent.instance.data.musicMute.removeChangeListener(this.onMuteChangeListener, this);
          UserSettingComponent.instance.data.sfxMute.removeChangeListener(this.onMuteChangeListener, this);
          UserSettingComponent.instance.data.vibrate.removeChangeListener(this.onVibrateListener, this);
          UserSettingComponent.instance.save();
        };
        _proto.onToggleMusic = function onToggleMusic(toggle) {
          UserSettingComponent.instance.data.musicMute.set(toggle.isChecked ? 0 : 1, false);
        };
        _proto.onToggleSoundEffect = function onToggleSoundEffect(toggle) {
          UserSettingComponent.instance.data.sfxMute.set(toggle.isChecked ? 0 : 1, false);
        };
        _proto.onToggleVibrate = function onToggleVibrate(toggle) {
          UserSettingComponent.instance.data.vibrate.set(toggle.isChecked ? 1 : 0, false);
          // AdManager.instance?.enableVibrate(toggle.isChecked);
        };

        _proto.onMusicSliderListner = function onMusicSliderListner(slider) {
          UserSettingComponent.instance.data.musicVolume.set(slider.progress, false);
        };
        _proto.onSfxSliderListner = function onSfxSliderListner(slider) {
          UserSettingComponent.instance.data.sfxVolume.set(slider.progress, false);
        };
        _proto.onVolumeChangeLisetner = function onVolumeChangeLisetner() {
          this.updateView();
        };
        _proto.onMuteChangeListener = function onMuteChangeListener() {
          this.updateView(true);
        };
        _proto.onVibrateListener = function onVibrateListener() {
          var _this$toggleVibrate;
          (_this$toggleVibrate = this.toggleVibrate) == null || _this$toggleVibrate.setIsCheckedWithoutNotify(UserSettingComponent.instance.data.vibrate.cur ? true : false);
        };
        _proto.updateView = function updateView(updateSlider) {
          if (updateSlider) {
            if (this.sliderMusic) this.sliderMusic.progress = UserSettingComponent.instance.data.musicVolume.cur;
            if (this.sliderSfx) this.sliderSfx.progress = UserSettingComponent.instance.data.sfxVolume.cur;
          }
        };
        return SettingView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "toggleMusic", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "toggleSfx", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toggleVibrate", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sliderMusic", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sliderSfx", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SideBarView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ViewComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "8e34bNNk+lMNLaP++d8u+dv", "SideBarView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SideBarView = exports('SideBarView', (_dec = ccclass('SideBarView'), _dec(_class = /*#__PURE__*/function (_ViewComponent) {
        _inheritsLoose(SideBarView, _ViewComponent);
        function SideBarView() {
          return _ViewComponent.apply(this, arguments) || this;
        }
        var _proto = SideBarView.prototype;
        _proto.start = function start() {};
        return SideBarView;
      }(ViewComponent)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Singleton.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c322b+vZURKYoWJvBCgUnFn", "Singleton", undefined);
      var Singleton = exports('default', /*#__PURE__*/function () {
        function Singleton() {}
        Singleton.getInstance = function getInstance() {
          if (!this.ins) {
            this.ins = new this();
          }
          return this.ins;
        };
        return Singleton;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SoulRankHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FriendsDataManager.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, FriendsDataManager, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      FriendsDataManager = module.FriendsDataManager;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1759dS10MVJCaGbfRcGU+wJ", "SoulRankHandler", undefined);
      var SoulRankHandler = exports('SoulRankHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(SoulRankHandler, _NetWorkHandler);
        function SoulRankHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = SoulRankHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("SoulRankHandler!!", this.data);
          FriendsDataManager.getInstance().soulRankData = this.data.rankInfos;
          FriendsDataManager.getInstance().myRank.set(this.data.myRank);
          FriendsDataManager.getInstance().soulRankDataInit.set(1);
        };
        return SoulRankHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineAnimState.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Handler.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, sp, tween, Component, Handler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Handler = module.default;
    }],
    execute: function () {
      var _dec, _class3;
      cclegacy._RF.push({}, "20b15Fv82tHiZ7JTCA8RYY7", "SpineAnimState", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SpineAnimState = exports('SpineAnimState', (_dec = ccclass('SpineAnimState'), _dec(_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpineAnimState, _Component);
        function SpineAnimState() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.disableUpdateFlyDiretion = false;
          _this.skeleton = void 0;
          _this.datas = [];
          _this.mixDatas = [];
          _this.state = void 0;
          _this.laststate = void 0;
          _this.handlers = [];
          _this.forceTw = void 0;
          return _this;
        }
        var _proto = SpineAnimState.prototype;
        _proto.onLoad = function onLoad() {
          this.initOnLoad();
          this.skeleton = this.node.getComponent(sp.Skeleton);
          this.initMix();
          this.initListener();
        };
        _proto.update = function update(deltaTime) {
          this.updateStateAnim();
        };
        _proto.addStateHandler = function addStateHandler(listener, caller) {
          this.handlers.push(new Handler(listener, caller));
        };
        _proto.deleteStateHandler = function deleteStateHandler(listener, caller) {
          var index = this.handlers.findIndex(function (t) {
            return t.call.toString() == listener.toString() && t.caller == caller;
          });
          if (index >= 0) this.handlers.splice(index, 1);
        };
        _proto.pause = function pause() {
          this.skeleton.paused = true;
        };
        _proto["continue"] = function _continue() {
          this.skeleton.paused = false;
        };
        _proto.initOnLoad = function initOnLoad() {};
        _proto.updateStateAnim = function updateStateAnim() {
          var _this2 = this;
          if (this.state == this.laststate) return;
          this.laststate = this.state;
          if (this.forceTw) {
            this.forceTw.stop();
            this.forceTw = null;
          }
          var data = this.datas[this.state];
          this.skeleton.setAnimation(0, data.name, data.loop);
          this.handlers.forEach(function (t) {
            return t.call(_this2.state);
          });
        };
        _proto.changeState = function changeState(state) {
          this.state = state;
        };
        _proto.initMix = function initMix() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.mixDatas), _step; !(_step = _iterator()).done;) {
            var data = _step.value;
            var animDataFrom = this.datas[data.from];
            var animDataTo = this.datas[data.to];
            this.skeleton.setMix(animDataFrom.name, animDataTo.name, data.duration);
          }
        };
        _proto.initListener = function initListener() {
          var _this3 = this;
          this.skeleton.setCompleteListener(function (entry) {
            if (!entry.animation) return;
            var data = _this3.datas.find(function (t) {
              return t.name == entry.animation.name;
            });
            if (data) {
              if (data.nextState != null) _this3.changeState(data.nextState);
            }
          });
          this.skeleton.setStartListener(function (entry) {
            if (!entry.animation) return;
            var data = _this3.datas.find(function (t) {
              return t.name == entry.animation.name;
            });
            if (data) {
              if (data.forceState != null) {
                _this3.forceTw = tween(_this3.node).delay(data.forceDelay).call(function () {
                  return _this3.changeState(data.forceState);
                }).start();
              }
            }
          });
        };
        return SpineAnimState;
      }(Component)) || _class3));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineControllComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, sp, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "54fb9S+oqBKPK/GO3pYWJWp", "SpineControllComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var SpineControllComponent = exports('default', (_dec = menu("1-Other/SpineControllComponent"), ccclass(_class = _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpineControllComponent, _Component);
        function SpineControllComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.sp = void 0;
          return _this;
        }
        var _proto = SpineControllComponent.prototype;
        _proto.onLoad = function onLoad() {
          this.sp = this.node.getComponent(sp.Skeleton);
        };
        _proto.play = function play(name, loop, track) {
          if (loop === void 0) {
            loop = false;
          }
          if (track === void 0) {
            track = 0;
          }
          this.sp.setAnimation(track, name, loop);
        };
        _proto.sliderListener = function sliderListener(slider) {
          this.stopAtTimeProgress(slider.progress);
        }

        /**
         * 停止在指定帧。1是开始，-1是最后
         * @param frame 帧数
         */;
        _proto.stopAtFrame = function stopAtFrame(frame) {
          var te = this.sp.getCurrent(0);

          // 算出帧对应的时间
          var time;
          if (frame === -1) {
            time = te.animation.duration; // 最后一帧
          } else if (frame > 1) {
            time = (frame - 1) / 60; // 根据帧率算出对应时间，spine帧率是30
          } else {
            time = 0; // 首帧
          }
          // 对time作限制
          if (time < 0) time = 0;
          if (time >= te.animation.duration) time = te.animation.duration - 0.01; // 太精确的话，动画会停在首帧，所以要减一点

          te.timeScale = 0; // 让动画停止
          te.trackTime = time;
        }

        /**
         * 停止在指定进度
         * @param progress 进度0-1
         */;
        _proto.stopAtTimeProgress = function stopAtTimeProgress(progress) {
          var te = this.sp.getCurrent(0);
          var time = progress * te.animation.duration;
          if (time == te.animation.duration) time = te.animation.duration - 0.01;
          te.timeScale = 0;
          te.trackTime = time;
        }

        //局部换装
        //注意：必须在骨骼动画显示时才能正常换装
        ;

        _proto.changeSlot = function changeSlot(skinName, slotName, targetAttaName) {
          //查找局部皮肤
          var skeletonData = this.sp.skeletonData.getRuntimeData();
          var targetSkin = skeletonData.findSkin(skinName);

          //查找局部皮肤下的插槽与附件
          var targetSkinSlotIndex = skeletonData.findSlotIndex(slotName);
          var atta = targetSkin.getAttachment(targetSkinSlotIndex, targetAttaName);

          //查找全身皮肤下的插槽
          var curSlot = this.sp.findSlot(slotName);

          //替换全身皮肤插槽的附件
          curSlot && curSlot.setAttachment(atta);
          curSlot = this.sp.findSlot(slotName);
        };
        return SpineControllComponent;
      }(Component)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpriteAnimator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResLoader.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Sprite, SpriteFrame, Component, ResLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }, function (module) {
      ResLoader = module.ResLoader;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "dfb80b+d2dLH5jvASZa6mLb", "SpriteAnimator", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SpriteAnimator = exports('SpriteAnimator', (_dec = ccclass('SpriteAnimator'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpriteAnimator, _Component);
        function SpriteAnimator() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.sprite = void 0;
          _this.assetCache = {};
          _this.interval = void 0;
          _this.duration = 200;
          _this.rid = 0;
          return _this;
        }
        var _proto = SpriteAnimator.prototype;
        _proto.onLoad = function onLoad() {
          this.sprite = this.getComponent(Sprite);
        };
        _proto.init = function init(rid, play, duration) {
          var _this2 = this;
          if (play === void 0) {
            play = true;
          }
          if (duration === void 0) {
            duration = 200;
          }
          this.rid = rid;
          this.duration = duration;
          if (this.assetCache[rid]) {
            this.play(play);
            return;
          }
          ResLoader.instance.loadDir("lobby", "manual/characters/char_" + rid + "/", function (assets) {
            _this2.assetCache[rid] = assets;
            _this2.play(play);
          });
        };
        _proto.play = function play(playAnim) {
          var _this3 = this;
          var frames = [];
          frames = this.assetCache[this.rid].filter(function (t) {
            return t instanceof SpriteFrame;
          });
          var cnt = 0;
          if (!this.sprite.node.active) this.sprite.node.active = true;
          this.sprite.spriteFrame = frames[cnt];
          clearInterval(this.interval);
          if (!playAnim) return;
          this.interval = setInterval(function () {
            cnt++;
            if (cnt >= frames.length) cnt = 0;
            _this3.sprite.spriteFrame = frames[cnt];
          }, this.duration);
        };
        return SpriteAnimator;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpriteFrameComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, SpriteFrame, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "5a28ftL+RJNY7o0udW1pYER", "SpriteFrameComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var SpriteFrameComponent = exports('default', (_dec = requireComponent(Sprite), _dec2 = menu("1-UI/SpriteFrameComponent"), _dec3 = property([SpriteFrame]), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpriteFrameComponent, _Component);
        function SpriteFrameComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "frames", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = SpriteFrameComponent.prototype;
        _proto.setFrame = function setFrame(spName) {
          var frame = this.frames.find(function (t) {
            return t.name == spName;
          });
          if (frame) {
            this.node.getComponent(Sprite).spriteFrame = frame;
          }
        };
        _proto.setFrameByIndex = function setFrameByIndex(index) {
          if (index < 0 || index >= this.frames.length) return;
          this.node.getComponent(Sprite).spriteFrame = this.frames[index];
        };
        _proto.setRandomFrame = function setRandomFrame() {
          if (this.frames.length == 0) return;
          this.node.getComponent(Sprite).spriteFrame = this.frames[Math.floor(Math.random() * this.frames.length)];
        };
        return SpriteFrameComponent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "frames", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StorageManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Encrypter.ts', './Singleton.ts'], function (exports) {
  var _inheritsLoose, cclegacy, sys, Encrypter, Singleton;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      Encrypter = module.default;
    }, function (module) {
      Singleton = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "98954aMhyZDZK0VHDiKa7LN", "StorageManager", undefined);
      var StorageManager = exports('default', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(StorageManager, _Singleton);
        function StorageManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this.cleared = false;
          return _this;
        }
        var _proto = StorageManager.prototype;
        /**
         * 保存数据到本地
         * @param key 键
         * @param value 值
         */
        _proto.set = function set(key, value, stringify) {
          if (stringify === void 0) {
            stringify = true;
          }
          if (this.cleared) return;
          var dataString = null;
          if (stringify) dataString = JSON.stringify(value);else dataString = value;
          sys.localStorage.setItem(Encrypter.Encode(key), Encrypter.Encode(dataString));
        }

        /**
         * 读取本地数据
         * @param key 键
         * @param parse 解析
         */;
        _proto.get = function get(key, parse) {
          if (parse === void 0) {
            parse = true;
          }
          var dataString = sys.localStorage.getItem(Encrypter.Encode(key));
          if (dataString) {
            if (parse) {
              try {
                return JSON.parse(Encrypter.Decode(dataString));
              } catch (_unused) {
                return Encrypter.Decode(dataString);
              }
            }
            return Encrypter.Decode(dataString);
          }
          return null;
        }

        /**
         * 移除本地数据
         * @param key 键
         */;
        _proto.remove = function remove(key) {
          if (this.cleared) return;
          sys.localStorage.removeItem(Encrypter.Encode(key));
        };
        _proto.clear = function clear() {
          sys.localStorage.clear();
          this.cleared = true;
        };
        return StorageManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SuperListData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4f8ad7zWkdMgJBie+9afCSH", "SuperListData", undefined);
      var SuperListData = exports('default', /*#__PURE__*/function () {
        function SuperListData(datas, itemsNum, isLoop, itemIndex) {
          if (itemsNum === void 0) {
            itemsNum = 0;
          }
          if (isLoop === void 0) {
            isLoop = false;
          }
          if (itemIndex === void 0) {
            itemIndex = 0;
          }
          //总页数
          this.pageNum = 0;
          //每页条目数
          this.pageItemsNum = 0;
          //当前页索引
          this.pageIndex = 0;
          //当前页条目数
          this.curPageItemsNum = 0;
          this._data = [];
          //是否循环列表
          this._isLoop = false;
          this._lastPageIndex = null;
          this._data = datas;
          this.pageItemsNum = itemsNum ? itemsNum : datas.length;
          this._isLoop = isLoop;
          this.pageIndex = Math.floor(itemIndex / itemsNum);
          this.updateData();
        }
        var _proto = SuperListData.prototype;
        _proto.addData = function addData(datas) {
          this._data = this._data.concat(datas);
          this.updateData();
        };
        _proto.insertData = function insertData(data, pos) {
          this._data.splice(pos, 0, data);
          this.updateData();
        };
        _proto.removeData = function removeData(index) {
          this._data.splice(index, 1);
          this.updateData();
        };
        _proto.turnLeft = function turnLeft() {
          this.pageIndex--;
          if (this.pageIndex < 0) this.pageIndex = this._isLoop ? this.pageNum - 1 : 0;
          this.checkPageUpdate();
        };
        _proto.turnRight = function turnRight() {
          this.pageIndex++;
          if (this.pageIndex >= this.pageNum) this.pageIndex = this._isLoop ? 0 : this.pageNum - 1;
          this.checkPageUpdate();
        };
        _proto.turnPage = function turnPage(page) {
          this.pageIndex = page;
          if (this.pageIndex < 0) this.pageIndex = this._isLoop ? this.pageNum - 1 : 0;else if (this.pageIndex >= this.pageNum) this.pageIndex = this._isLoop ? 0 : this.pageNum - 1;
          this.checkPageUpdate();
        }

        //默认返回当前页数据
        ;

        _proto.getPageData = function getPageData(page) {
          if (page === void 0) {
            page = null;
          }
          var datas = [];
          page = page == null ? this.pageIndex : 0;
          for (var i = 0; i < this.pageItemsNum; i++) {
            var index = page * (this.pageItemsNum - 1) + i;
            if (index >= this._data.length) break;
            datas.push(this._data[index]);
          }
          return datas;
        };
        _proto.onBorderCall = function onBorderCall() {};
        _proto.onPageUpdateCall = function onPageUpdateCall() {};
        _proto.updateData = function updateData() {
          this.pageNum = Math.ceil(this._data.length / this.pageItemsNum);
          this.curPageItemsNum = this.pageIndex == this.pageNum - 1 ? this._data.length - this.pageIndex * this.pageItemsNum : this.pageItemsNum;
          this.pageIndex = Math.min(this.pageIndex, this.pageNum - 1);
          this.pageIndex = this.pageIndex < 0 ? this.pageIndex = 0 : this.pageIndex;
          this.checkPageUpdate();
        };
        _proto.checkPageUpdate = function checkPageUpdate() {
          if (this._lastPageIndex != this.pageIndex) {
            this.onPageUpdateCall();
          }
          this._lastPageIndex = this.pageIndex;
        };
        _createClass(SuperListData, [{
          key: "data",
          get:
          //所有数据
          function get() {
            return this._data;
          }
        }]);
        return SuperListData;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SuperPageIndicator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SuperPageView.ts', './SpriteFrameComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, instantiate, Component, SuperPageEvent, SpriteFrameComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      SuperPageEvent = module.SuperPageEvent;
    }, function (module) {
      SpriteFrameComponent = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "cb2c6kNgh5AtKdqAiz9cFH7", "SuperPageIndicator", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SuperPageIndicator = exports('SuperPageIndicator', (_dec = ccclass('SuperPageIndicator'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SuperPageIndicator, _Component);
        function SuperPageIndicator() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "itemNode", _descriptor, _assertThisInitialized(_this));
          _this.items = [];
          return _this;
        }
        var _proto = SuperPageIndicator.prototype;
        _proto.onLoad = function onLoad() {
          this.node.on(SuperPageEvent.PageInit, this.onPageInitListener, this);
          this.node.on(SuperPageEvent.PageTurning, this.onPageTurningListener, this);
        };
        _proto.start = function start() {
          this.itemNode.active = false;
        };
        _proto.update = function update(deltaTime) {};
        _proto.onPageInitListener = function onPageInitListener(pageNum, curPage) {
          for (var i = 0; i < pageNum; i++) {
            var item = instantiate(this.itemNode);
            item.active = true;
            item.parent = this.itemNode.parent;
            item.getComponent(SpriteFrameComponent).setFrameByIndex(curPage == i ? 1 : 0);
            this.items.push(item);
          }
        };
        _proto.onPageTurningListener = function onPageTurningListener(curPage, lastPage) {
          var item1 = this.items[curPage];
          var item2 = this.items[lastPage];
          item1.getComponent(SpriteFrameComponent).setFrameByIndex(1);
          item2.getComponent(SpriteFrameComponent).setFrameByIndex(0);
        };
        return SuperPageIndicator;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SuperPageView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SuperListData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _createClass, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, size, UITransform, v3, tween, instantiate, Component, rect, SuperListData;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      size = module.size;
      UITransform = module.UITransform;
      v3 = module.v3;
      tween = module.tween;
      instantiate = module.instantiate;
      Component = module.Component;
      rect = module.rect;
    }, function (module) {
      SuperListData = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class2, _class3, _descriptor, _descriptor2, _descriptor3, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class5, _class6, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;
      cclegacy._RF.push({}, "819a1neczJMX4PCH4XsWOlj", "SuperPageView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SuperPageEvent = exports('SuperPageEvent', /*#__PURE__*/function (SuperPageEvent) {
        SuperPageEvent["ItemUpdate"] = "OnItemUpdate";
        SuperPageEvent["ItemRecycle"] = "OnItemRecycle";
        SuperPageEvent["PageInit"] = "OnPageInit";
        SuperPageEvent["PageTurning"] = "OnPageTurning";
        return SuperPageEvent;
      }({}));
      var ValidPos = /*#__PURE__*/function () {
        function ValidPos(pos, index) {
          this.pos = void 0;
          this.index = 0;
          this.item = void 0;
          this.pos = v3(pos);
          this.index = index;
        }
        var _proto = ValidPos.prototype;
        _proto.setItem = function setItem(node) {
          this.item = node;
          if (this.item) this.item.setPosition(this.pos);
        };
        return ValidPos;
      }();
      var Spacing = exports('Spacing', (_dec = ccclass("Spacing"), _dec2 = property(Node), _dec3 = property({
        displayName: "横向间距"
      }), _dec4 = property({
        displayName: "竖向间距"
      }), _dec(_class2 = (_class3 = /*#__PURE__*/function () {
        function Spacing() {
          _initializerDefineProperty(this, "node", _descriptor, this);
          _initializerDefineProperty(this, "_x", _descriptor2, this);
          _initializerDefineProperty(this, "_y", _descriptor3, this);
        }
        _createClass(Spacing, [{
          key: "x",
          get: function get() {
            return this._x;
          },
          set: function set(value) {
            this._x = value;
          }
        }, {
          key: "y",
          get: function get() {
            return this._y;
          },
          set: function set(value) {
            this._y = value;
          }
        }]);
        return Spacing;
      }(), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, "node", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class3.prototype, "x", [_dec3], Object.getOwnPropertyDescriptor(_class3.prototype, "x"), _class3.prototype), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "_x", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class3.prototype, "y", [_dec4], Object.getOwnPropertyDescriptor(_class3.prototype, "y"), _class3.prototype), _descriptor3 = _applyDecoratedDescriptor(_class3.prototype, "_y", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class3)) || _class2));
      var SuperPageView = exports('default', (_dec5 = ccclass('SuperPageView'), _dec6 = property({
        type: Node,
        displayName: "容器节点"
      }), _dec7 = property({
        type: Node,
        displayName: "条目节点模板"
      }), _dec8 = property({
        displayName: "每页条目总数"
      }), _dec9 = property({
        displayName: "列数",
        tooltip: "默认按照从左到右，从上到下的排列规则"
      }), _dec10 = property({
        displayName: "是否循环翻页"
      }), _dec11 = property({
        displayName: "是否分帧加载"
      }), _dec12 = property({
        displayName: "分帧加载间隔(毫秒)"
      }), _dec13 = property({
        displayName: "是否横向滚动",
        tooltip: "默认横向滚动，反之竖向"
      }), _dec14 = property({
        displayName: "是否划动翻页"
      }), _dec15 = property({
        type: Spacing,
        displayName: "条目间距设置"
      }), _dec16 = property({
        type: [Node],
        displayName: "事件接收对象"
      }), _dec5(_class5 = (_class6 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SuperPageView, _Component);
        function SuperPageView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "content", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemNode", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_pageItemsNum", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_columns", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isLoop", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isFrameSplit", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "frameLoadInterval", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isHorizontal", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "canSlideTurnPage", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "space", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "eventNodes", _descriptor14, _assertThisInitialized(_this));
          //当前页条目数
          _this.curPageNum = 0;
          _this.itemPool = [];
          //每页预先计算好的条目坐标集合
          _this.itemsPagePos = [];
          _this.listdata = void 0;
          _this.lastPageIndex = -1;
          _this.itemSize = void 0;
          _this.itemHalfSize = void 0;
          _this.visibleWorldArea = void 0;
          _this.validPos = [];
          _this.delta = 0;
          return _this;
        }
        var _proto2 = SuperPageView.prototype;
        _proto2.onLoad = function onLoad() {
          this.itemSize = size(this.itemNode.getComponent(UITransform).contentSize);
          this.itemHalfSize = size(this.itemSize.width * 0.5, this.itemSize.height * 0.5);
          this.visibleWorldArea = this.node.getComponent(UITransform).getBoundingBoxToWorld();
          this.itemNode.active = false;
          this.content.removeAllChildren();
          var touchLayer = this.node.getChildByName("touchlayer");
          if (touchLayer) {
            touchLayer.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
            touchLayer.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            touchLayer.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
            touchLayer.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          }
        };
        _proto2.start = function start() {
          this.initItemsPagePos();
        };
        _proto2.update = function update(dt) {
          this.checkVisibleItem();
        };
        _proto2.lateUpdate = function lateUpdate(dt) {
          this.delta += dt * 1000;
          if (this.delta > this.frameLoadInterval) {
            this.delta = 0;
            this.frameLoad();
          }
        };
        _proto2.onTouchStart = function onTouchStart(event) {};
        _proto2.onTouchMove = function onTouchMove(event) {};
        _proto2.onTouchEnd = function onTouchEnd(event) {};
        _proto2.init = function init(datas, curItemIndex) {
          if (curItemIndex === void 0) {
            curItemIndex = 0;
          }
          this.listdata = new SuperListData(datas, this.pageItemsNum, this.isLoop, curItemIndex);
          if (this.isHorizontal) {
            this.content.setPosition(this.content.position.add3f(-this.visibleWorldArea.width * this.listdata.pageIndex, 0, 0));
          } else {
            this.content.setPosition(this.content.position.add3f(0, -this.visibleWorldArea.height * this.listdata.pageIndex, 0));
          }
          this.lastPageIndex = this.listdata.pageIndex;
          this.emit(SuperPageEvent.PageInit, this.listdata.pageNum, this.listdata.pageIndex);
        };
        _proto2.layoutEditorItems = function layoutEditorItems() {
          this.initItemsPagePos();
          for (var i = 0; i < this.content.children.length; i++) {
            var node = this.content.children[i];
            node.setPosition(this.itemsPagePos[i]);
          }
        };
        _proto2.initItemsPagePos = function initItemsPagePos() {
          this.itemsPagePos = [];
          var itemTrans = this.itemNode.getComponent(UITransform);
          var totalWidth = this.columns * itemTrans.width + (this.columns - 1) * this.space.x;
          var startX = -totalWidth * 0.5 + itemTrans.width * 0.5;
          var row = Math.ceil(this.pageItemsNum / this.columns);
          var totalHeight = row * itemTrans.height + (row - 1) * this.space.y;
          var startY = totalHeight * 0.5 - itemTrans.height * 0.5;
          var lineCnt = 0;
          var rowCnt = 0;
          for (var i = 0; i < this.pageItemsNum; i++) {
            if (i != 0 && i % this.columns == 0) {
              lineCnt = 0;
              rowCnt++;
            }
            var pos = v3(startX + lineCnt * (itemTrans.width + this.space.x), startY - rowCnt * (itemTrans.height + this.space.y));
            this.itemsPagePos.push(pos);
            lineCnt++;
          }
        };
        _proto2.checkVisibleItem = function checkVisibleItem() {
          var _this2 = this;
          for (var i = this.validPos.length - 1; i >= 0; i--) {
            var posData = this.validPos[i];
            if (posData.item && posData.item.active) {
              var box = posData.item.getComponent(UITransform).getBoundingBoxToWorld();
              if (this.visibleWorldArea.intersects(box)) continue;
              var item = posData.item;
              if (item) {
                this.onItemRecycle(item);
                item.active = false;
              }
              this.validPos.splice(i, 1);
            }
          }
          var _loop = function _loop() {
            var pos = v3(_this2.itemsPagePos[_i]).add3f(_this2.listdata.pageIndex * _this2.visibleWorldArea.width, 0, 0);
            var worldPos = _this2.content.getComponent(UITransform).convertToWorldSpaceAR(pos);
            var _rect = rect(worldPos.x - _this2.itemHalfSize.width, worldPos.y - _this2.itemHalfSize.height, _this2.itemSize.width, _this2.itemSize.height);
            var _rect_1 = null;
            var _rect_2 = null;
            if (_this2.validPos.find(function (p) {
              return p.pos.equals(pos);
            })) return 1; // continue
            if (_this2.isHorizontal) {
              //当前条目对应左边一页的条目
              _rect_1 = rect(_rect.x - _this2.visibleWorldArea.width, _rect.y, _rect.width, _rect.height);
              //当前条目对应右边一页的条目
              _rect_2 = rect(_rect.x + _this2.visibleWorldArea.width, _rect.y, _rect.width, _rect.height);
            }
            var canAdd = _rect && _this2.visibleWorldArea.intersects(_rect) || _rect_1 && _this2.visibleWorldArea.intersects(_rect_1) || _rect_2 && _this2.visibleWorldArea.intersects(_rect_2);
            if (canAdd) {
              var index = _i + _this2.listdata.pageIndex * _this2.listdata.pageItemsNum;
              if (index < _this2.listdata.data.length) _this2.validPos.push(new ValidPos(pos, index));
            }
          };
          for (var _i = 0; _i < this.itemsPagePos.length; _i++) {
            if (_loop()) continue;
          }
        };
        _proto2.frameLoad = function frameLoad() {
          var posData = this.validPos.find(function (t) {
            return !t.item;
          });
          if (!posData) return;
          var item = this.getItem();
          if (!item) return;
          posData.setItem(item);
          this.onItemUpdate(item, posData.index, this.listdata.data[posData.index]);
        };
        _proto2.turnPageLeft = function turnPageLeft() {
          this.listdata.turnLeft();
          if (this.lastPageIndex == this.listdata.pageIndex) return;
          tween(this.content).to(0.5, {
            position: v3(-this.visibleWorldArea.width * this.listdata.pageIndex)
          }, {
            easing: "cubicOut"
          }).start();
          this.emit(SuperPageEvent.PageTurning, this.listdata.pageIndex, this.lastPageIndex);
          this.lastPageIndex = this.listdata.pageIndex;
        };
        _proto2.turnPageRight = function turnPageRight() {
          this.listdata.turnRight();
          if (this.lastPageIndex == this.listdata.pageIndex) return;
          tween(this.content).to(0.5, {
            position: v3(-this.visibleWorldArea.width * this.listdata.pageIndex)
          }, {
            easing: "cubicOut"
          }).start();
          this.emit(SuperPageEvent.PageTurning, this.listdata.pageIndex, this.lastPageIndex);
          this.lastPageIndex = this.listdata.pageIndex;
        };
        _proto2.onItemUpdate = function onItemUpdate(item, index, data) {
          this.emit(SuperPageEvent.ItemUpdate, item, index, data);
        };
        _proto2.onItemRecycle = function onItemRecycle(item) {
          this.emit(SuperPageEvent.ItemRecycle, item);
        };
        _proto2.getItem = function getItem() {
          var item = this.itemPool.find(function (t) {
            return t.active == false;
          });
          if (!item) {
            item = instantiate(this.itemNode);
            this.content.addChild(item);
            this.itemPool.push(item);
          }
          item.active = true;
          return item;
        };
        _proto2.emit = function emit(event, arg1, arg2, arg3, arg4) {
          this.eventNodes.forEach(function (node) {
            node == null || node.emit(event, arg1, arg2, arg3, arg4);
          });
        };
        _createClass(SuperPageView, [{
          key: "pageItemsNum",
          get: function get() {
            return this._pageItemsNum;
          },
          set: function set(val) {
            this._pageItemsNum = val;
          }
        }, {
          key: "columns",
          get: function get() {
            return this._columns;
          },
          set: function set(val) {
            this._columns = val;
          }
        }]);
        return SuperPageView;
      }(Component), (_descriptor4 = _applyDecoratedDescriptor(_class6.prototype, "content", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class6.prototype, "itemNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class6.prototype, "pageItemsNum", [_dec8], Object.getOwnPropertyDescriptor(_class6.prototype, "pageItemsNum"), _class6.prototype), _descriptor6 = _applyDecoratedDescriptor(_class6.prototype, "_pageItemsNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class6.prototype, "columns", [_dec9], Object.getOwnPropertyDescriptor(_class6.prototype, "columns"), _class6.prototype), _descriptor7 = _applyDecoratedDescriptor(_class6.prototype, "_columns", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class6.prototype, "isLoop", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class6.prototype, "isFrameSplit", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class6.prototype, "frameLoadInterval", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class6.prototype, "isHorizontal", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class6.prototype, "canSlideTurnPage", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class6.prototype, "space", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Spacing();
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class6.prototype, "eventNodes", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class6)) || _class5));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SwitchState.ts", ['cc', './Handlers.ts'], function (exports) {
  var cclegacy, Handlers;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Handlers = module.Handlers;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f389224/IVI84f7PAIteYEa", "SwitchState", undefined);
      var SwitchState = exports('SwitchState', /*#__PURE__*/function () {
        function SwitchState() {
          this.stateChangeHandler = new Handlers();
          this.currentState = 0;
        }
        var _proto = SwitchState.prototype;
        _proto.setState = function setState(state) {
          var lastState = this.currentState;
          this.currentState = state;
          if (this.currentState != lastState) this.stateChangeHandler.emit(state, lastState, true);
        };
        _proto.addState = function addState(state) {
          var lastState = this.currentState;
          this.currentState |= state;
          if (this.currentState != lastState) this.stateChangeHandler.emit(state, lastState, true);
        };
        _proto.removeState = function removeState(state) {
          var lastState = this.currentState;
          this.currentState &= ~state;
          if (this.currentState != lastState) this.stateChangeHandler.emit(state, lastState);
        };
        _proto.hasState = function hasState(state) {
          return (this.currentState & state) === state;
        };
        _proto.isState = function isState(state) {
          return this.currentState == state;
        };
        return SwitchState;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TargetBuildingRoot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BuildingRoot.ts', './GlobalEventManager.ts', './Constants.ts', './UIConstant.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ScrollView, BuildingRoot, GlobalEventManager, GameEvent, UIEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ScrollView = module.ScrollView;
    }, function (module) {
      BuildingRoot = module.BuildingRoot;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GameEvent = module.GameEvent;
    }, function (module) {
      UIEvent = module.UIEvent;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "5bcf8/ifRJLSJ8x06SX8bSN", "TargetBuildingRoot", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TargetBuildingRoot = exports('TargetBuildingRoot', (_dec = ccclass('TargetBuildingRoot'), _dec(_class = /*#__PURE__*/function (_BuildingRoot) {
        _inheritsLoose(TargetBuildingRoot, _BuildingRoot);
        function TargetBuildingRoot() {
          return _BuildingRoot.apply(this, arguments) || this;
        }
        var _proto = TargetBuildingRoot.prototype;
        _proto.onLoad = function onLoad() {
          this.scrollView = this.getComponent(ScrollView);
          this.scrollView.enabled = false;
          GlobalEventManager.getInstance().on(GameEvent.InitBuildings, this.onInitBuildings, this);
        };
        _proto.onEnable = function onEnable() {
          GlobalEventManager.getInstance().emit(UIEvent.EnableMaskTouch, false);
        };
        _proto.onInitBuildings = function onInitBuildings(storeyInfos, firstLoading, playerId) {
          this.initTowerByInfo(storeyInfos);
        };
        return TargetBuildingRoot;
      }(BuildingRoot)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TemplateListView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ListViewComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, Component, ListViewComponent, AbsAdapter;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      ListViewComponent = module.default;
      AbsAdapter = module.AbsAdapter;
    }],
    execute: function () {
      var _class;
      cclegacy._RF.push({}, "ab548KDE2FIPYfizZLRWsCF", "TemplateListView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ListAdapter = /*#__PURE__*/function (_AbsAdapter) {
        _inheritsLoose(ListAdapter, _AbsAdapter);
        function ListAdapter(data) {
          var _this;
          _this = _AbsAdapter.call(this) || this;
          _this.setDataSet(data);
          return _this;
        }
        var _proto = ListAdapter.prototype;
        _proto.updateView = function updateView(item, posIndex, data) {
          item.getComponentInChildren(Label).string = data;
        };
        _proto.onClickItem = function onClickItem(item, data, index) {};
        return ListAdapter;
      }(AbsAdapter);
      var TemplateListView = exports('default', ccclass(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TemplateListView, _Component);
        function TemplateListView() {
          var _this2;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this2 = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this2.listview = null;
          return _this2;
        }
        var _proto2 = TemplateListView.prototype;
        _proto2.onLoad = function onLoad() {
          this.listview = this.node.getComponent(ListViewComponent);
          if (!this.listview) {
            this.listview = this.node.getComponentInChildren(ListViewComponent);
          }

          //强制屏蔽触摸
          // let pageview = this.listview.getScrollView() as any;
          // pageview._onTouchBegan = ()=>{};
          // pageview._onTouchMoved = ()=>{};
          // pageview._onTouchEnded = ()=>{};
          // pageview._onTouchCancelled = ()=>{};
        };

        _proto2.start = function start() {
          this.listview.setAdapter(new ListAdapter(["节奏春节", "追逐人生", "危险瑜伽", "testData3", "testData4", "testData5", "testData6", "testData7", "testData8", "testData9", "testData10"]));
        };
        return TemplateListView;
      }(Component)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TemplatePageView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SuperPageView.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Label, Component, SuperPageEvent, SuperPageView;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      SuperPageEvent = module.SuperPageEvent;
      SuperPageView = module.default;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "c7b70p7QShCD7crJBHK0lIO", "TemplatePageView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TemplatePageView = exports('TemplatePageView', (_dec = ccclass('TemplatePageView'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TemplatePageView, _Component);
        function TemplatePageView() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = TemplatePageView.prototype;
        _proto.start = function start() {
          this.node.on(SuperPageEvent.ItemUpdate, this.onItemUpdateListener, this);
          this.node.getComponent(SuperPageView).init([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 0);
        };
        _proto.onItemUpdateListener = function onItemUpdateListener(item, index, data) {
          item.getComponentInChildren(Label).string = data.toString();
        };
        return TemplatePageView;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToggleGroup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "ce517Prtk5BwJFjeZfGqgZ2", "ToggleGroup", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var ToggleGroup = exports('default', (_dec = menu("1-UI/ToggleGroup"), _dec2 = property({
        displayName: "点击去重"
      }), _dec3 = property({
        displayName: "初始化调用"
      }), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ToggleGroup, _Component);
        function ToggleGroup() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "noRepeat", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "initial", _descriptor2, _assertThisInitialized(_this));
          _this.lastToggleIndex = -1;
          _this._toggleEnableCall = void 0;
          _this._toggleDisableCall = void 0;
          _this._caller = void 0;
          return _this;
        }
        var _proto = ToggleGroup.prototype;
        _proto.addListener = function addListener(enableCall, disableCall, caller) {
          this._toggleEnableCall = enableCall;
          this._toggleDisableCall = disableCall;
          this._caller = caller;
        };
        _proto.clearLast = function clearLast() {
          this.lastToggleIndex = -1;
        };
        _proto.start = function start() {
          var _this2 = this;
          this.node.children.forEach(function (node, index) {
            if (_this2.initial) {
              if (index == 0) {
                if (_this2._toggleEnableCall) {
                  _this2._caller ? _this2._toggleEnableCall.call(_this2._caller, node, index) : _this2._toggleEnableCall(node, index);
                }
                _this2.lastToggleIndex = index;
              } else {
                if (_this2._toggleDisableCall) {
                  _this2._caller ? _this2._toggleDisableCall.call(_this2._caller, node, index) : _this2._toggleDisableCall(node, index);
                }
              }
            }
            node.on(Node.EventType.TOUCH_END, function () {
              if (_this2.noRepeat && _this2.lastToggleIndex == index) {
                return;
              }
              if (_this2._toggleDisableCall && _this2.lastToggleIndex >= 0) {
                _this2._caller ? _this2._toggleDisableCall.call(_this2._caller, _this2.node.children[_this2.lastToggleIndex], _this2.lastToggleIndex) : _this2._toggleDisableCall(_this2.node.children[_this2.lastToggleIndex], _this2.lastToggleIndex);
              }
              if (_this2._toggleEnableCall) {
                _this2._caller ? _this2._toggleEnableCall.call(_this2._caller, node, index) : _this2._toggleEnableCall(node, index);
              }
              _this2.lastToggleIndex = index;
            }, _this2);
          });
        };
        _createClass(ToggleGroup, [{
          key: "toggleEnableCall",
          set: function set(callFunc) {
            this._toggleEnableCall = callFunc;
          }
        }, {
          key: "toggleDisableCall",
          set: function set(callFunc) {
            this._toggleDisableCall = callFunc;
          }
        }]);
        return ToggleGroup;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "noRepeat", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "initial", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenAbsoluteMove.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TweenAnimBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, tween, v3, TweenAnimBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      tween = module.tween;
      v3 = module.v3;
    }, function (module) {
      TweenAnimBase = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "7257enB2StOBoDHFVVxxNfu", "TweenAbsoluteMove", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var TweenAbsoluteMove = exports('default', (_dec = menu("1-TweenAnim/TweenAbsoluteMove"), _dec2 = property(Vec3), _dec3 = property(Vec3), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_TweenAnimBase) {
        _inheritsLoose(TweenAbsoluteMove, _TweenAnimBase);
        function TweenAbsoluteMove() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _TweenAnimBase.call.apply(_TweenAnimBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "startPoint", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "endPoint", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenAbsoluteMove.prototype;
        _proto["do"] = function _do() {
          var _this2 = this;
          _TweenAnimBase.prototype["do"].call(this);
          if (!this.startPoint.equals(this.endPoint)) {
            this.animTarget.setPosition(this.startPoint);
            tween(this.animTarget).delay(this.delay).to(this.duration, {
              position: this.endPoint
            }, {
              easing: this.easename
            }).call(function () {
              return _this2.callOver();
            }).start();
          }
        };
        return TweenAbsoluteMove;
      }(TweenAnimBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startPoint", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return v3();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "endPoint", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return v3();
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenAnimBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, v3, UIOpacity, Widget, Tween, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      v3 = module.v3;
      UIOpacity = module.UIOpacity;
      Widget = module.Widget;
      Tween = module.Tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "1b879e5+QNMFb5leByHGo4M", "TweenAnimBase", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TweenAnimBase = exports('default', (_dec = property(Node), ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenAnimBase, _Component);
        function TweenAnimBase() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "duration", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "delay", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "easename", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "animTarget", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playOnStart", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playOnActive", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "forceUpdateWidget", _descriptor7, _assertThisInitialized(_this));
          _this.originPos = void 0;
          _this.originScale = void 0;
          _this.originOpacity = void 0;
          _this.opacityComponent = void 0;
          return _this;
        }
        var _proto = TweenAnimBase.prototype;
        _proto.onLoad = function onLoad() {
          var _this$opacityComponen;
          if (!this.animTarget) this.animTarget = this.node;
          this.originPos = v3(this.animTarget.getPosition());
          this.originScale = v3(this.animTarget.scale);
          this.opacityComponent = this.animTarget.getComponent(UIOpacity);
          this.originOpacity = (_this$opacityComponen = this.opacityComponent) == null ? void 0 : _this$opacityComponen.opacity;
        };
        _proto.start = function start() {
          if (this.playOnStart) {
            this["do"]();
          }
        };
        _proto.onEnable = function onEnable() {
          if (this.playOnActive) {
            this["do"]();
          }
        };
        _proto["do"] = function _do() {
          if (!this.forceUpdateWidget) return;
          var widget = this.node.getComponent(Widget);
          if (widget) {
            widget.updateAlignment();
            this.originPos = v3(this.animTarget.getPosition());
            widget.enabled = false;
          }
        };
        _proto.callOver = function callOver() {
          if (!this.forceUpdateWidget) return;
          var widget = this.node.getComponent(Widget);
          if (widget) {
            widget.enabled = true;
          }
        };
        _proto.stopAnim = function stopAnim() {
          Tween.stopAllByTarget(this.animTarget);
        };
        return TweenAnimBase;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "delay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "easename", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "smooth";
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "animTarget", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playOnStart", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "playOnActive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "forceUpdateWidget", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenBreath.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TweenAnimBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, v3, tween, TweenAnimBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      tween = module.tween;
    }, function (module) {
      TweenAnimBase = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "f6b39Pg55hApLDfGAHxorKj", "TweenBreath", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var TweenBreath = exports('default', (_dec = menu("1-TweenAnim/TweenBreath"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_TweenAnimBase) {
        _inheritsLoose(TweenBreath, _TweenAnimBase);
        function TweenBreath() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _TweenAnimBase.call.apply(_TweenAnimBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "scaleMaxOffset", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scaleMinOffset", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenBreath.prototype;
        _proto["do"] = function _do() {
          _TweenAnimBase.prototype["do"].call(this);
          var scale1 = v3(this.originScale).add3f(this.scaleMaxOffset, this.scaleMaxOffset, this.scaleMaxOffset);
          var scale2 = v3(this.originScale).add3f(-this.scaleMinOffset, -this.scaleMinOffset, -this.scaleMinOffset);
          tween(this.animTarget).repeatForever(tween(this.animTarget).to(this.duration, {
            scale: scale1
          }).to(this.duration, {
            scale: this.originScale
          }).to(this.duration, {
            scale: scale2
          }).to(this.duration, {
            scale: this.originScale
          })).start();
        };
        return TweenBreath;
      }(TweenAnimBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scaleMaxOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scaleMinOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenDelayCloseView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TweenAnimBase.ts', './ViewComponent.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, tween, TweenAnimBase, ViewComponent;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      tween = module.tween;
    }, function (module) {
      TweenAnimBase = module.default;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "e6366DaYGNL562adAtXVIon", "TweenDelayCloseView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var TweenDelayCloseView = exports('default', (_dec = menu("1-TweenAnim/TweenDelayCloseView"), _dec2 = property(Node), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_TweenAnimBase) {
        _inheritsLoose(TweenDelayCloseView, _TweenAnimBase);
        function TweenDelayCloseView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _TweenAnimBase.call.apply(_TweenAnimBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "targetView", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenDelayCloseView.prototype;
        _proto.onLoad = function onLoad() {
          var _this$targetView;
          _TweenAnimBase.prototype.onLoad.call(this);
          this.targetView = (_this$targetView = this.targetView) != null ? _this$targetView : this.node;
        };
        _proto["do"] = function _do() {
          var _this2 = this;
          _TweenAnimBase.prototype["do"].call(this);
          tween(this.animTarget).delay(this.delay).call(function () {
            return _this2.callOver();
          }).start();
        };
        _proto.callOver = function callOver() {
          _TweenAnimBase.prototype.callOver.call(this);
          if (this.targetView.getComponent(ViewComponent)) this.targetView.getComponent(ViewComponent).close();else this.targetView.destroy();
        };
        return TweenDelayCloseView;
      }(TweenAnimBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenFade.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TweenAnimBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, Enum, tween, TweenAnimBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      Enum = module.Enum;
      tween = module.tween;
    }, function (module) {
      TweenAnimBase = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "135d0c7xp9CU4czunM2+h7K", "TweenFade", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu,
        requireComponent = _decorator.requireComponent;
      var TweenFadeType = /*#__PURE__*/function (TweenFadeType) {
        TweenFadeType[TweenFadeType["FadeIn"] = 0] = "FadeIn";
        TweenFadeType[TweenFadeType["FadeOut"] = 1] = "FadeOut";
        return TweenFadeType;
      }(TweenFadeType || {});
      var TweenFade = exports('default', (_dec = menu("1-TweenAnim/TweenFade"), _dec2 = requireComponent(UIOpacity), _dec3 = property({
        type: Enum(TweenFadeType)
      }), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_TweenAnimBase) {
        _inheritsLoose(TweenFade, _TweenAnimBase);
        function TweenFade() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _TweenAnimBase.call.apply(_TweenAnimBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "fadeIn", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenFade.prototype;
        _proto["do"] = function _do() {
          var _this2 = this;
          _TweenAnimBase.prototype["do"].call(this);
          switch (this.fadeIn) {
            case TweenFadeType.FadeIn:
              this.opacityComponent.opacity = 0;
              tween(this.opacityComponent).delay(this.delay).to(this.duration, {
                opacity: this.originOpacity
              }, {
                easing: this.easename
              }).call(function () {
                return _this2.callOver();
              }).start();
              break;
            case TweenFadeType.FadeOut:
              this.opacityComponent.opacity = this.originOpacity;
              tween(this.opacityComponent).delay(this.delay).to(this.duration, {
                opacity: 0
              }, {
                easing: this.easename
              }).call(function () {
                return _this2.callOver();
              }).start();
              break;
          }
        };
        return TweenFade;
      }(TweenAnimBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "fadeIn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return TweenFadeType.FadeIn;
        }
      }), _class2)) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenFloat.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TweenAnimBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, tween, v3, TweenAnimBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      v3 = module.v3;
    }, function (module) {
      TweenAnimBase = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "eb586FpU1RCZZUA6RrUFqgX", "TweenFloat", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var TweenFloat = exports('default', (_dec = menu("1-TweenAnim/TweenFloat"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_TweenAnimBase) {
        _inheritsLoose(TweenFloat, _TweenAnimBase);
        function TweenFloat() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _TweenAnimBase.call.apply(_TweenAnimBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "offset", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenFloat.prototype;
        _proto["do"] = function _do() {
          _TweenAnimBase.prototype["do"].call(this);
          tween(this.animTarget).repeatForever(tween(this.animTarget).by(this.duration, {
            position: v3(0, this.offset, 0)
          }).by(this.duration, {
            position: v3(0, -this.offset, 0)
          })).start();
        };
        return TweenFloat;
      }(TweenAnimBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "offset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenRelativeMove.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TweenAnimBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, tween, v3, TweenAnimBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      tween = module.tween;
      v3 = module.v3;
    }, function (module) {
      TweenAnimBase = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "7b0acd2mVtJAZWbhm7UTgCR", "TweenRelativeMove", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var TweenRelativeMove = exports('default', (_dec = menu("1-TweenAnim/TweenRelativeMove"), _dec2 = property(Node), _dec3 = property(Node), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_TweenAnimBase) {
        _inheritsLoose(TweenRelativeMove, _TweenAnimBase);
        function TweenRelativeMove() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _TweenAnimBase.call.apply(_TweenAnimBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "relativeX", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "relativeY", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fromX", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fromY", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "relativeStartNode", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "relativeFromNode", _descriptor6, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenRelativeMove.prototype;
        _proto["do"] = function _do() {
          var _this2 = this;
          _TweenAnimBase.prototype["do"].call(this);
          if (this.relativeX != 0) {
            if (this.relativeStartNode) this.animTarget.setPosition(this.relativeStartNode.getPosition());
            tween(this.animTarget).delay(this.delay).to(this.duration, {
              position: v3(this.originPos.x + this.relativeX, this.originPos.y, this.originPos.z)
            }, {
              easing: this.easename
            }).call(function () {
              return _this2.callOver();
            }).start();
          } else if (this.relativeY != 0) {
            if (this.relativeStartNode) this.animTarget.setPosition(this.relativeStartNode.getPosition());
            tween(this.animTarget).delay(this.delay).to(this.duration, {
              position: v3(this.originPos.x, this.originPos.y + this.relativeY, this.originPos.z)
            }, {
              easing: this.easename
            }).call(function () {
              return _this2.callOver();
            }).start();
          } else if (this.relativeFromNode) {
            this.animTarget.setPosition(this.relativeFromNode.getPosition());
            tween(this.animTarget).delay(this.delay).to(this.duration, {
              position: this.originPos
            }, {
              easing: this.easename
            }).call(function () {
              return _this2.callOver();
            }).start();
          } else if (this.fromX != 0) {
            this.animTarget.setPosition(this.originPos.x + this.fromX, this.originPos.y);
            tween(this.animTarget).delay(this.delay).to(this.duration, {
              position: this.originPos
            }, {
              easing: this.easename
            }).call(function () {
              return _this2.callOver();
            }).start();
          } else if (this.fromY != 0) {
            this.animTarget.setPosition(this.originPos.x, this.originPos.y + this.fromY);
            tween(this.animTarget).delay(this.delay).to(this.duration, {
              position: this.originPos
            }, {
              easing: this.easename
            }).call(function () {
              return _this2.callOver();
            }).start();
          }
        };
        return TweenRelativeMove;
      }(TweenAnimBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "relativeX", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "relativeY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fromX", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fromY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "relativeStartNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "relativeFromNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenRewardsFly.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, UITransform, Sprite, v3, tween, Component, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      v3 = module.v3;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      Utils = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "8dc5fHY5uhIm6f0AnmdQy8d", "TweenRewardsFly", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var TweenRewardsFly = exports('default', (_dec = menu("1-TweenAnim/TweenRewardsFly"), _dec2 = property({
        type: Node,
        displayName: "目标节点"
      }), _dec3 = property({
        type: Node,
        displayName: "父节点"
      }), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenRewardsFly, _Component);
        function TweenRewardsFly() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "parent", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "num", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenRewardsFly.prototype;
        _proto.action = function action(finishCall) {
          var _this$parent;
          this.parent = (_this$parent = this.parent) != null ? _this$parent : this.node.parent;
          var offset = this.num == 1 ? 0 : 100;
          var pos = this.parent.getComponent(UITransform).convertToNodeSpaceAR(this.node.getWorldPosition());
          var dst = this.parent.getComponent(UITransform).convertToNodeSpaceAR(this.target.getWorldPosition());
          for (var i = 0; i < this.num; i++) {
            var item = new Node("RewardsFlyNode");
            var sprite = item.addComponent(Sprite);
            item.parent = this.parent;
            sprite.spriteFrame = this.node.getComponent(Sprite).spriteFrame;
            item.setPosition(this.parent.getComponent(UITransform).convertToNodeSpaceAR(this.node.getComponent(UITransform).convertToWorldSpaceAR(v3())));
            var offsetPos = v3(pos).add(v3(Utils.floatRandomRange(-offset, offset), Utils.floatRandomRange(-offset, offset)));
            tween(item).delay(0.01 * i).to(0.3, {
              position: offsetPos
            }, {
              easing: "cubicOut"
            }).to(0.5, {
              position: dst
            }, {
              easing: "backIn"
            }).call(function () {
              if (finishCall) finishCall();
            }).removeSelf().start();
          }
        };
        return TweenRewardsFly;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "parent", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "num", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenScale.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TweenAnimBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, tween, Vec3, TweenAnimBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      TweenAnimBase = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "2c9dfRte65M1INZ4VdEpbCK", "TweenScale", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ZoomType = /*#__PURE__*/function (ZoomType) {
        ZoomType[ZoomType["ZoomIn"] = 0] = "ZoomIn";
        ZoomType[ZoomType["ZoomOut"] = 1] = "ZoomOut";
        return ZoomType;
      }(ZoomType || {});
      var TweenScale = exports('default', (_dec = menu("1-TweenAnim/TweenScale"), _dec2 = property({
        type: Enum(ZoomType)
      }), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_TweenAnimBase) {
        _inheritsLoose(TweenScale, _TweenAnimBase);
        function TweenScale() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _TweenAnimBase.call.apply(_TweenAnimBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "zoomIn", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenScale.prototype;
        _proto["do"] = function _do() {
          var _this2 = this;
          _TweenAnimBase.prototype["do"].call(this);
          switch (this.zoomIn) {
            case ZoomType.ZoomIn:
              tween(this.animTarget).delay(this.delay).call(function () {
                return _this2.animTarget.setScale(Vec3.ZERO);
              }).to(this.duration, {
                scale: this.originScale
              }, {
                easing: this.easename
              }).call(function () {
                return _this2.callOver();
              }).start();
              break;
            case ZoomType.ZoomOut:
              tween(this.animTarget).delay(this.delay).call(function () {
                return _this2.animTarget.setScale(_this2.originScale);
              }).to(this.duration, {
                scale: Vec3.ZERO
              }, {
                easing: this.easename
              }).call(function () {
                return _this2.callOver();
              }).start();
              break;
          }
        };
        return TweenScale;
      }(TweenAnimBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "zoomIn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ZoomType.ZoomIn;
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenZoom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TweenAnimBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, v3, tween, TweenAnimBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      tween = module.tween;
    }, function (module) {
      TweenAnimBase = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "8baf0yRYgpD9ICy72Y/wYVK", "TweenZoom", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var TweenZoom = exports('default', (_dec = menu("1-TweenAnim/TweenZoom"), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_TweenAnimBase) {
        _inheritsLoose(TweenZoom, _TweenAnimBase);
        function TweenZoom() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _TweenAnimBase.call.apply(_TweenAnimBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "from", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "to", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TweenZoom.prototype;
        _proto["do"] = function _do() {
          var _this2 = this;
          _TweenAnimBase.prototype["do"].call(this);
          this.animTarget.setScale(v3(this.from, this.from, this.from));
          tween(this.animTarget).delay(this.delay).to(this.duration, {
            scale: v3(this.to, this.to, this.to)
          }, {
            easing: this.easename
          }).call(function () {
            return _this2.callOver();
          }).start();
        };
        return TweenZoom;
      }(TweenAnimBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "from", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "to", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIConstant.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0fffdpZ4shKYLyFdkhxuY60", "UIConstant", undefined);
      var UIEvent = exports('UIEvent', /*#__PURE__*/function (UIEvent) {
        UIEvent["EnableMaskTouch"] = "EnableMaskTouchEvent";
        UIEvent["NodeScaleChange"] = "NodeScaleChangeEvent";
        UIEvent["CacheReward"] = "CacheRewardEvent";
        UIEvent["SyncCachedReward"] = "SyncCachedRewardEvent";
        UIEvent["ClearCacheReward"] = "ClearCacheRewardEvent";
        UIEvent["UpdateBuildingListContentSize"] = "UpdateBuildingListContentSize";
        UIEvent["RefreshCardsView"] = "RefreshCardsViewEvent";
        return UIEvent;
      }({}));
      var UIDef = exports('UIDef', /*#__PURE__*/function (UIDef) {
        return UIDef;
      }({}));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UpdateRoleHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameDataManager.ts', './NetWorkHandler.ts'], function (exports) {
  var _inheritsLoose, cclegacy, GameDataManager, NetWorkHandler;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameDataManager = module.default;
    }, function (module) {
      NetWorkHandler = module.NetWorkHandler;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c3f770DGIRFnpSBw8fjYnBk", "UpdateRoleHandler", undefined);
      var UpdateRoleHandler = exports('UpdateRoleHandler', /*#__PURE__*/function (_NetWorkHandler) {
        _inheritsLoose(UpdateRoleHandler, _NetWorkHandler);
        function UpdateRoleHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _NetWorkHandler.call.apply(_NetWorkHandler, [this].concat(args)) || this;
          _this.data = void 0;
          return _this;
        }
        var _proto = UpdateRoleHandler.prototype;
        _proto.onHandler = function onHandler() {
          console.log("UpdateRoleHandler!!", this.data);
          GameDataManager.getInstance().data.role.set(this.data.roleId);
        };
        return UpdateRoleHandler;
      }(NetWorkHandler));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserDataComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ExInteger.ts', './LocalDataComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ExInteger, LocalDataComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ExInteger = module.default;
    }, function (module) {
      LocalDataComponent = module.default;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "a8b6a5dC5hAArSjJ9wqYQTA", "UserDataComponent", undefined);
      var UserData = function UserData() {
        this.gold = new ExInteger().init(0);
        this.diamond = new ExInteger().init(0);
      };
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var UserDataComponent = exports('default', ccclass(_class = (_class2 = /*#__PURE__*/function (_LocalDataComponent) {
        _inheritsLoose(UserDataComponent, _LocalDataComponent);
        function UserDataComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _LocalDataComponent.call.apply(_LocalDataComponent, [this].concat(args)) || this;
          _this.key = "UserData";
          return _this;
        }
        var _proto = UserDataComponent.prototype;
        _proto.defaultInit = function defaultInit() {
          UserDataComponent.instance = this;
          return new UserData();
        };
        return UserDataComponent;
      }(LocalDataComponent), _class2.instance = void 0, _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserNetRequest.ts", ['cc', './NetConstant.ts', './NetComponent.ts', './NetConfig.ts'], function (exports) {
  var cclegacy, NetCode, NetComponent, NetConfig;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      NetCode = module.NetCode;
    }, function (module) {
      NetComponent = module.NetComponent;
    }, function (module) {
      NetConfig = module.NetConfig;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f44ceNNH/1CHIRYAFD7eWVd", "UserNetRequest", undefined);
      var UserNetRequest = exports('UserNetRequest', /*#__PURE__*/function () {
        function UserNetRequest() {}
        UserNetRequest.changeNick = function changeNick(nick) {
          var _NetComponent$instanc;
          var buffer = OPUpdateNickName.encode({
            nickName: nick
          }).finish();
          (_NetComponent$instanc = NetComponent.instance.gameServer) == null || _NetComponent$instanc.send(buffer, NetCode.OPCODE_UPDATE_NICK_NAME);
        };
        UserNetRequest.changeAvatar = function changeAvatar(avatar) {
          var _NetComponent$instanc2;
          var buffer = OPUpdateAvatar.encode({
            avatarNo: avatar
          }).finish();
          (_NetComponent$instanc2 = NetComponent.instance.gameServer) == null || _NetComponent$instanc2.send(buffer, NetCode.OPCODE_UPDATE_AVATAR);
        };
        UserNetRequest.login = function login(token) {
          var _NetComponent$instanc3;
          var buffer = OPLogin.encode({
            token: token,
            version: NetConfig.instance.data.version
          }).finish();
          (_NetComponent$instanc3 = NetComponent.instance.gameServer) == null || _NetComponent$instanc3.send(buffer, NetCode.OPCODE_PLAYER_LOGIN);
        };
        UserNetRequest.soulRank = function soulRank() {
          var _NetComponent$instanc4;
          var buffer = OPSoulRank.encode({
            version: NetConfig.instance.data.version
          }).finish();
          (_NetComponent$instanc4 = NetComponent.instance.gameServer) == null || _NetComponent$instanc4.send(buffer, NetCode.OPCODE_SOUL_RANK);
        };
        UserNetRequest.updateRole = function updateRole(id) {
          var _NetComponent$instanc5;
          var buffer = OPUpdateRoleId.encode({
            roleId: id
          }).finish();
          (_NetComponent$instanc5 = NetComponent.instance.gameServer) == null || _NetComponent$instanc5.send(buffer, NetCode.OPCODE_UPDATE_ROLE_ID);
        };
        return UserNetRequest;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserSettingComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ExInteger.ts', './LocalDataComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, ExInteger, LocalDataComponent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      ExInteger = module.default;
    }, function (module) {
      LocalDataComponent = module.default;
    }],
    execute: function () {
      var _class, _class2;
      cclegacy._RF.push({}, "69b71TzvlhCvJ5XhzaBekd8", "UserSettingComponent", undefined);
      var SettingData = function SettingData() {
        this.musicMute = new ExInteger().init(0);
        this.sfxMute = new ExInteger().init(0);
        this.musicVolume = new ExInteger().init(1);
        this.sfxVolume = new ExInteger().init(1);
        this.vibrate = new ExInteger().init(1);
      };
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var UserSettingComponent = exports('default', ccclass(_class = (_class2 = /*#__PURE__*/function (_LocalDataComponent) {
        _inheritsLoose(UserSettingComponent, _LocalDataComponent);
        function UserSettingComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _LocalDataComponent.call.apply(_LocalDataComponent, [this].concat(args)) || this;
          _this.key = "UserSetting";
          return _this;
        }
        var _proto = UserSettingComponent.prototype;
        _proto.defaultInit = function defaultInit() {
          UserSettingComponent.instance = this;
          return new SettingData();
        };
        return UserSettingComponent;
      }(LocalDataComponent), _class2.instance = void 0, _class2)) || _class);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserVitComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './Utils.ts', './ExInteger.ts', './LocalDataComponent.ts', './ViewCenter.ts', './GlobalConfig.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, GlobalEventManager, Utils, ExInteger, LocalDataComponent, ViewCenter, GlobalViewDef;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      Utils = module.default;
    }, function (module) {
      ExInteger = module.default;
    }, function (module) {
      LocalDataComponent = module.default;
    }, function (module) {
      ViewCenter = module.ViewCenter;
    }, function (module) {
      GlobalViewDef = module.GlobalViewDef;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class2, _class3, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class4;
      cclegacy._RF.push({}, "a3cd17HQylPbZrpYvXw/wZs", "UserVitComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var VitEvent = exports('VitEvent', /*#__PURE__*/function (VitEvent) {
        VitEvent["Recovery"] = "VitRecoveryEvent";
        return VitEvent;
      }({}));
      var VitVideoScene = exports('VitVideoScene', /*#__PURE__*/function (VitVideoScene) {
        VitVideoScene["Infinity"] = "\u4F53\u529B\u65E0\u9650";
        VitVideoScene["Full"] = "\u4F53\u529B\u52A0\u6EE1";
        return VitVideoScene;
      }({}));
      var VitData = function VitData() {
        this.vit = new ExInteger().init(0);
        this.timestamp = 0;
        this.unlimitedVideoTime = new ExInteger().init(0);
        this.unlimitedTimestamp = 0;
      };
      var UserVitComponent = exports('default', (_dec = property({
        displayName: "初始体力"
      }), _dec2 = property({
        displayName: "体力上限"
      }), _dec3 = property({
        displayName: "恢复时间"
      }), _dec4 = property({
        displayName: "恢复点数"
      }), _dec5 = property({
        displayName: "无限体力视频数"
      }), ccclass(_class2 = (_class3 = (_class4 = /*#__PURE__*/function (_LocalDataComponent) {
        _inheritsLoose(UserVitComponent, _LocalDataComponent);
        function UserVitComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _LocalDataComponent.call.apply(_LocalDataComponent, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "origin", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "max", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "recoveryTime", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "recoveryVal", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "unlimitedVideoTimeMax", _descriptor5, _assertThisInitialized(_this));
          _this.key = "UserVit";
          _this.loopIsRun = false;
          return _this;
        }
        var _proto = UserVitComponent.prototype;
        _proto.defaultInit = function defaultInit() {
          UserVitComponent.instance = this;
          this.data = new VitData();
          this.data.vit.set(this.origin);
          return this.data;
        };
        _proto.init = function init() {
          var _this2 = this;
          this.data.vit.max = this.max;
          this.data.vit.setWriteListener(function (cur, last) {
            if (last == _this2.max && cur < _this2.max) {
              _this2.data.timestamp = Date.now();
              if (!_this2.loopIsRun) _this2.scheduleStart();
            }
            _this2.save();
          });
          if (this.data.timestamp != 0) {
            var interval = Math.floor((Date.now() - this.data.timestamp) * 0.001);
            if (interval > this.recoveryTime) {
              var val = Math.floor(interval / this.recoveryTime);
              this.data.timestamp = Date.now();
              if (!this.data.vit.isMax()) this.data.vit.add(val, false);
            }
          }
          if (!this.data.vit.isMax() && !this.loopIsRun) this.scheduleStart();
          this.data.unlimitedVideoTime.max = this.unlimitedVideoTimeMax;
          if (Utils.isNewDay(this.data.unlimitedTimestamp)) {
            this.data.unlimitedTimestamp = Date.now();
            this.data.unlimitedVideoTime.cur = 0;
          }
        };
        _proto.overAddVit = function overAddVit(val, save) {
          if (val === void 0) {
            val = 1;
          }
          this.data.vit.canOverMax = true;
          this.data.vit.add(val, save);
          this.data.vit.canOverMax = false;
        };
        _proto.subVit = function subVit() {
          if (this.isUnlimited()) return true;
          if (this.data.vit.isLow()) {
            ViewCenter.instance.show(GlobalViewDef.FreeVitView, null, 1);
            return false;
          }
          this.data.vit.add(-1);
          return true;
        };
        _proto.isUnlimited = function isUnlimited() {
          return this.data.unlimitedVideoTime.cur >= this.unlimitedVideoTimeMax;
        };
        _proto.recoveryLoop = function recoveryLoop() {
          this.loopIsRun = true;
          var interval = this.recoveryTime - Math.floor((Date.now() - this.data.timestamp) * 0.001);
          if (interval <= 0) {
            this.data.timestamp = Date.now();
            this.data.vit.add(this.recoveryVal);
          }
          GlobalEventManager.getInstance().emit(VitEvent.Recovery, interval);
          if (this.data.vit.isMax()) {
            this.loopIsRun = false;
            this.unschedule(this.recoveryLoop);
          }
        };
        _proto.scheduleStart = function scheduleStart() {
          this.recoveryLoop();
          this.schedule(this.recoveryLoop, 1);
        };
        return UserVitComponent;
      }(LocalDataComponent), _class4.instance = void 0, _class4), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, "origin", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "max", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class3.prototype, "recoveryTime", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class3.prototype, "recoveryVal", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class3.prototype, "unlimitedVideoTimeMax", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      })), _class3)) || _class2));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Utils.ts", ['cc'], function (exports) {
  var cclegacy, Vec2, v3, math, v2, Vec3, tween, director, Animation, misc;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      v3 = module.v3;
      math = module.math;
      v2 = module.v2;
      Vec3 = module.Vec3;
      tween = module.tween;
      director = module.director;
      Animation = module.Animation;
      misc = module.misc;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c82e7G+hP1BEZBRPwhMwkNN", "Utils", undefined);

      //常用工具类
      var Utils = exports('default', /*#__PURE__*/function () {
        function Utils() {}
        /**
         * 求圆周上等分点的坐标
         * @param r 半径
         * @param ox 圆心坐标
         * @param oy 
         * @param count 等分个数
         */
        Utils.getCirclePoints = function getCirclePoints(r, ox, oy, count, func) {
          var point = [];
          var radians = Math.PI / 180 * Math.round(360 / count); //弧度
          for (var i = 0; i < count; i++) {
            var rad = radians * i;
            var x = ox + r * Math.sin(rad);
            var y = oy + r * Math.cos(rad);
            point.push(new Vec2(x, y));
            if (func) func(v3(x, y, 0), v3(0, 0, -math.toDegree(rad)), i);
          }
          return point;
        };
        Utils.randomRange = function randomRange(min, max, withoutNum) {
          var tmax = Math.max(min, max);
          var tmin = Math.min(min, max);
          if (withoutNum != null) {
            var arr = [];
            for (var i = tmin; i < tmax + 1; i++) {
              if (withoutNum != i) {
                arr.push(i);
              }
            }
            return arr[Math.floor(Math.random() * arr.length)];
          }
          return Math.round(Math.random() * (tmax - tmin)) + tmin;
        };
        Utils.randomMax = function randomMax(max) {
          return Math.round(Math.random() * max);
        };
        Utils.floatRandomRange = function floatRandomRange(min, max) {
          var tmax = Math.max(min, max);
          var tmin = Math.min(min, max);
          return Math.random() * (tmax - tmin) + tmin;
        };
        Utils.vt2distance = function vt2distance(x1, y1, x2, y2) {
          return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        };
        Utils.searchStr = function searchStr(str, key) {
          return str.indexOf(key) >= 0;
        };
        Utils.findChild = function findChild(node, name) {
          var strArg = name.split("/");
          for (var i = 0; i < strArg.length; i++) {
            name = strArg[i];
            node = node.getChildByName(name);
            if (node == null) {
              return null;
            }
          }
          return node;
        };
        Utils.getCenterVec2 = function getCenterVec2(a, b, ratio) {
          if (ratio === void 0) {
            ratio = 0.5;
          }
          var vect = v2();
          Vec2.add(vect, a, b);
          return vect.multiplyScalar(ratio);
        };
        Utils.getCenterVec3 = function getCenterVec3(a, b, ratio) {
          if (ratio === void 0) {
            ratio = 0.5;
          }
          var vect = v3();
          Vec3.add(vect, a, b);
          return vect.multiplyScalar(ratio);
        };
        Utils.shake = function shake(node, delay, times, amplitude, callFunc) {
          if (delay === void 0) {
            delay = 0.1;
          }
          if (times === void 0) {
            times = 1;
          }
          if (amplitude === void 0) {
            amplitude = 5;
          }
          if (this.shakeTween) this.shakeTween.stop();
          this.shakeTween = tween(node).repeat(times, tween(node).by(delay, {
            position: v3(amplitude, amplitude)
          }).by(delay, {
            position: v3(amplitude, -amplitude)
          }).by(delay, {
            position: v3(-amplitude, -amplitude)
          }).by(delay, {
            position: v3(-amplitude, amplitude)
          }).by(delay, {
            position: v3(0, 0)
          })).call(function () {
            if (callFunc) callFunc();
          }).start();
        };
        Utils.getTimeStr = function getTimeStr(ctime, hour, symbol) {
          if (hour === void 0) {
            hour = false;
          }
          if (symbol === void 0) {
            symbol = ":";
          }
          var returnStr = '';

          // 天数位
          // let day = Math.floor(ctime / 3600 / 24);
          // let dayStr = day.toString();
          // if (dayStr.length == 1) dayStr = '0' + dayStr;

          // 小时位
          if (hour) {
            var hr = Math.floor(ctime / 3600);
            var hrStr = hr.toString();
            if (hrStr.length == 1) hrStr = '0' + hrStr;
            returnStr = hrStr + symbol;
          }

          // 分钟位
          var min = Math.floor(ctime / 60 % 60);
          var minStr = min.toString();
          if (minStr.length == 1) minStr = '0' + minStr;
          returnStr += minStr + symbol;

          // 秒位
          var sec = Math.floor(ctime % 60);
          var secStr = sec.toString();
          if (secStr.length == 1) secStr = '0' + secStr;
          returnStr += secStr;
          return returnStr;
        };
        Utils.isNewDay = function isNewDay(timestamp) {
          if (timestamp == null) timestamp = 0;
          var date = new Date(timestamp);
          var curDate = new Date();
          // log(date.getFullYear(), date.getMonth(), date.getDate());
          if (date.getFullYear() < curDate.getFullYear() || date.getMonth() < curDate.getMonth() || date.getDate() < curDate.getDate()) return true;
          return false;
        }

        //将目标角度转换成0到360
        ;

        Utils.transAngle = function transAngle(angle) {
          return (360 + Math.floor(angle) % 360) % 360;
        };
        Utils.updateNumberAnim = function updateNumberAnim(originNum, objNum, lbl, duration, callFunc, caller) {
          if (duration === void 0) {
            duration = 1;
          }
          var obj = {
            num: 0
          };
          var callback = function callback() {
            if (callFunc) callFunc.call(caller);
          };
          obj.num = originNum;
          lbl.string = obj.num.toString();
          tween(obj).to(duration, {
            num: objNum
          }, {
            progress: function progress(start, end, current, t) {
              if (!lbl || !lbl.isValid) return;
              lbl.string = Math.ceil(start + (end - start) * t).toString();
              return start + (end - start) * t;
            }
          }).call(callback).start();
        };
        Utils.updateUniNumberAnim = function updateUniNumberAnim(originNum, objNum, lbl, duration, callFunc, caller) {
          var _this = this;
          if (duration === void 0) {
            duration = 1;
          }
          var obj = {
            num: 0
          };
          var callback = function callback() {
            if (callFunc) callFunc.call(caller);
          };
          obj.num = originNum;
          lbl.string = this.toThousands(obj.num);
          tween(obj).to(duration, {
            num: objNum
          }, {
            progress: function progress(start, end, current, t) {
              if (!lbl || !lbl.isValid) return;
              lbl.string = _this.toThousands(Math.ceil(start + (end - start) * t));
              return start + (end - start) * t;
            }
          }).call(callback).start();
        };
        Utils.isRemoteUrl = function isRemoteUrl(url) {
          return url.indexOf("http://") == 0 || url.indexOf("https://") == 0;
        };
        Utils.isDir = function isDir(url) {
          return url[url.length - 1] == '/';
        }

        //处理超大数的单位转换
        ;

        Utils.processNumFormat = function processNumFormat(num) {
          var bit = 0;
          var numStr = Math.floor(num).toString();
          if (numStr.indexOf('e') >= 0) {
            numStr = numStr.substr(numStr.indexOf('e') + 2);
            bit = Number(numStr) + 1;
          } else {
            bit = numStr.length;
          }
          if (bit < 5) return this.fixNum(num, 2);
          var unitIndex = Math.floor((bit - 1) / 3);
          num = num / Math.pow(1000, unitIndex);
          // console.log("processNumFormat", num);
          return this.fixNum(num, 2) + (this.units[unitIndex] != null ? this.units[unitIndex] : this.units[this.units.length - 1]);
        }

        //根据传入的bit保留多少位小数且不用0填充
        ;

        Utils.fixNum = function fixNum(num, bit) {
          var floatNums = this.getNumFloatBit(num);
          // console.log(bit, floatNums, num.toFixed(2));
          if (bit < floatNums) {
            var t = Math.pow(10, bit);
            num = Math.floor(num * t) / t;
            return num.toString();
          }
          return num.toString();
        }

        //获取小数位个数
        ;

        Utils.getNumFloatBit = function getNumFloatBit(num) {
          var bit = 0;
          var floatNums = num.toString().split('.')[1];
          if (floatNums) bit = floatNums.length;
          return bit;
        };
        Utils.pauseAllAnims = function pauseAllAnims() {
          var anims = director.getScene().getComponentsInChildren(Animation);
          anims.forEach(function (anim) {
            anim.pause();
          });
        };
        Utils.resumeAllAnims = function resumeAllAnims() {
          var anims = director.getScene().getComponentsInChildren(Animation);
          anims.forEach(function (anim) {
            anim.resume();
          });
        }

        //仅适用于凸多边形
        ;

        Utils.sortPolygonPoints = function sortPolygonPoints(points) {
          if (!points || points.length == 0) return;
          var center = v2();
          var x = 0;
          var y = 0;
          for (var i = 0; i < points.length; i++) {
            x += points[i].x;
            y += points[i].y;
          }
          center.x = Math.floor(x / points.length);
          center.y = Math.floor(y / points.length);
          for (var _i = 0; _i < points.length - 1; _i++) {
            for (var j = 0; j < points.length - _i - 1; j++) {
              if (this.polyComparePoints(points[j], points[j + 1], center)) {
                var tmp = points[j];
                points[j] = points[j + 1];
                points[j + 1] = tmp;
              }
            }
          }
        };
        Utils.polyComparePoints = function polyComparePoints(p1, p2, center) {
          if (p1.x >= 0 && p2.x < 0) return true;else if (p1.x == 0 && p2.x == 0) return p1.y > p2.y;
          var det = (p1.x - center.x) * (p2.y - center.y) - (p2.x - center.x) * (p1.y - center.y);
          if (det < 0) return true;
          if (det > 0) return false;
          var d1 = (p1.x - center.x) * (p1.x - center.x) + (p1.y - center.y) * (p1.y - center.y);
          var d2 = (p2.x - center.x) * (p2.x - center.x) + (p2.y - center.y) * (p2.y - center.y);
          return d1 > d2;
        };
        Utils.deepCopy = function deepCopy(target, source) {
          return Object.assign(target, source);
        };
        Utils.lookAt = function lookAt(node, direction, fixedAngle) {
          if (fixedAngle === void 0) {
            fixedAngle = 0;
          }
          if (direction.equals(Vec2.ZERO)) return;
          var angle = v2(direction).signAngle(v2(1, 0));
          node.angle = -misc.radiansToDegrees(angle) + fixedAngle;
        }

        //判断线段相交及返回交点
        ;

        Utils.interectionPoint = function interectionPoint(A, B, C, D, interPoint) {
          var area_abc = (A.x - C.x) * (B.y - C.y) - (A.y - C.y) * (B.x - C.x);
          var area_abd = (A.x - D.x) * (B.y - D.y) - (A.y - D.y) * (B.x - D.x);
          if (area_abc * area_abd >= 0) return false;
          var area_cda = (C.x - A.x) * (D.y - A.y) - (C.y - A.y) * (D.x - A.x);
          var area_cdb = area_cda + area_abc - area_abd;
          if (area_cda * area_cdb >= 0) return false;
          if (interPoint) {
            var t = area_cda / (area_abd - area_abc);
            var dx = t * (B.x - A.x);
            var dy = t * (B.y - A.y);
            interPoint.x = dx + A.x;
            interPoint.y = dy + A.y;
          }
          return true;
        }

        //权重随机
        ;

        Utils.weightRandom = function weightRandom(weights, maxWeight) {
          if (maxWeight === void 0) {
            maxWeight = 0;
          }
          if (!maxWeight) {
            weights.forEach(function (t) {
              return maxWeight += t;
            });
          }
          var weight = 0;
          var random = this.randomRange(1, maxWeight);
          for (var i = 0; i < weights.length; i++) {
            if (random > weight && random <= weight + weights[i]) {
              return i;
            } else {
              weight += weights[i];
            }
          }
          return 0;
        };
        Utils.vecToAngle = function vecToAngle(vec) {
          if (vec.equals(Vec2.ZERO)) return;
          var radian = v2(vec).signAngle(v2(1, 0)); //求方向向量和单位向量之间的弧度

          var degree = -misc.radiansToDegrees(radian); //弧度转成角度

          return degree;
        };
        Utils.accAdd = function accAdd(arg1, arg2) {
          var r1, r2, m;
          try {
            r1 = arg1.toString().split(".")[1].length;
          } catch (e) {
            r1 = 0;
          }
          try {
            r2 = arg2.toString().split(".")[1].length;
          } catch (e) {
            r2 = 0;
          }
          m = Math.pow(10, Math.max(r1, r2));
          return (arg1 * m + arg2 * m) / m;
        };
        Utils.reverseVec = function reverseVec(vec) {
          if (!vec) return;
          return v2(-vec.x, -vec.y);
        };
        Utils.toChinesNum = function toChinesNum(num) {
          if (Utils.chinesWords[num]) return Utils.chinesWords[num];else if (num > 10 && num < 20) {
            var numStr = num.toString();
            var n = numStr.substring(1, 2);
            var result = Utils.chinesUnit[1] + Utils.chinesWords[n];
            return result;
          } else if (num > 10) {
            var _result = "";
            var _numStr = num.toString();
            for (var i = 0; i < _numStr.length; ++i) {
              var _n = _numStr.substring(i, i + 1);
              var m = _numStr.length - i - 1;
              _result += Utils.chinesWords[_n] + Utils.chinesUnit[m];
            }
            return _result;
          } else return "零";
        };
        Utils.toThousands = function toThousands(num) {
          return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        };
        Utils.rotateDirection = function rotateDirection(points) {
          if (!points || points.length < 3) return 1;
          var clockwise = 0;
          var anticlockwise = 0;
          for (var i = 0; i < points.length - 2; i++) {
            var t = this.area(points[i], points[i + 1], points[i + 2]);
            if (t == 1) clockwise++;else if (t == -1) anticlockwise++;
          }
          return clockwise >= anticlockwise ? -1 : 1;
        };
        Utils.area = function area(a, b, c) {
          var triangle_area = a.x * b.y - a.y * b.x + a.y * c.x - a.x * c.y + b.x * c.y - c.x * b.y;
          if (triangle_area < 0) return -1;else if (triangle_area > 0) return 1;
          return 0;
        };
        Utils.randomTrueFalse = function randomTrueFalse() {
          return Math.round(Math.random());
        }

        //随机正负1
        ;

        Utils.randomPosNeg = function randomPosNeg() {
          return this.randomTrueFalse() ? 1 : -1;
        };
        Utils.saveData = function saveData(data, fileName) {
          if (fileName === void 0) {
            fileName = 'data.json';
          }
          var json = JSON.stringify(data);
          var blob = new Blob([json], {
            type: 'application/json'
          });
          var url = URL.createObjectURL(blob);
          var link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        };
        Utils.removeDuplicates = function removeDuplicates(arr) {
          var set = new Set(arr);
          return Array.from(set);
        };
        Utils.truncateString = function truncateString(str, length) {
          if (length === void 0) {
            length = 20;
          }
          var truncated = '';
          var count = 0;
          for (var i = 0; i < str.length; i++) {
            var _char = str[i];
            var charCode = str.charCodeAt(i);

            // 判断字符是否是中文字符
            if (charCode >= 0x4E00 && charCode <= 0x9FFF || charCode >= 0x3400 && charCode <= 0x4DBF) {
              count += 2; // 中文字符长度为2
            } else {
              count += 1; // 非中文字符长度为1
            }

            // 判断是否达到指定长度
            if (count <= length) {
              truncated += _char;
            } else {
              break;
            }
          }

          // 添加省略号
          if (count > length) {
            truncated += '...';
          }
          return truncated;
        };
        Utils.getFileNameFromPath = function getFileNameFromPath(path) {
          var fileNameWithExtension = path.split('/').pop(); // 获取带有后缀的文件名
          if (!fileNameWithExtension) {
            return '';
          }
          return fileNameWithExtension;
        };
        return Utils;
      }());
      Utils.shakeTween = void 0;
      Utils.units = ["", "K", "M", "B", "T", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an"];
      Utils.chinesWords = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
      Utils.chinesUnit = ["", '十', '百', '千', '万', '亿', '十', '百', '千'];
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UtilsBezier.ts", ['cc'], function (exports) {
  var cclegacy, v3, tween;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      v3 = module.v3;
      tween = module.tween;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c460bHmvwBH14pd3z1iBtTQ", "UtilsBezier", undefined);
      var UtilsBezier = exports('default', /*#__PURE__*/function () {
        function UtilsBezier() {}
        //anchorpoints：贝塞尔基点
        //pointsAmount：生成的点数
        //return 路径点的Array
        UtilsBezier.CreateBezierPoints = function CreateBezierPoints(anchorpoints, pointsAmount, func, enableZ) {
          var points = [];
          for (var i = 0; i < pointsAmount; i++) {
            var point = UtilsBezier.MultiPointBezier(anchorpoints, i / pointsAmount, enableZ);
            if (func) func(point, i);
            points.push(point);
          }
          return points;
        };
        UtilsBezier.MultiPointBezier = function MultiPointBezier(points, t, enableZ) {
          var len = points.length;
          var x = 0,
            y = 0,
            z = 0;
          var func = function func(start, end) {
            var cs = 1,
              bcs = 1;
            while (end > 0) {
              cs *= start;
              bcs *= end;
              start--;
              end--;
            }
            return cs / bcs;
          };
          for (var i = 0; i < len; i++) {
            var point = points[i];
            x += point.x * Math.pow(1 - t, len - 1 - i) * Math.pow(t, i) * func(len - 1, i);
            y += point.y * Math.pow(1 - t, len - 1 - i) * Math.pow(t, i) * func(len - 1, i);
            if (enableZ) z += point.z * Math.pow(1 - t, len - 1 - i) * Math.pow(t, i) * func(len - 1, i);
          }
          return v3(x, y, z);
        };
        UtilsBezier.bezierTo = function bezierTo(target, duration, c1, c2, c3, updateCall) {
          var twoBezier = function twoBezier(t, p1, cp, p2) {
            var x = (1 - t) * (1 - t) * p1.x + 2 * t * (1 - t) * cp.x + t * t * p2.x;
            var y = (1 - t) * (1 - t) * p1.y + 2 * t * (1 - t) * cp.y + t * t * p2.y;
            return v3(x, y, 0);
          };
          return tween(target).to(duration, {}, {
            onUpdate: function onUpdate(t, ratio) {
              target.setPosition(twoBezier(ratio, c1, c2, c3));
              if (updateCall) updateCall(ratio);
            }
          });
        };
        UtilsBezier.getCenterPoint = function getCenterPoint(a, b, progress) {
          if (progress === void 0) {
            progress = 0.5;
          }
          var vect = v3(a).add(b);
          return vect.multiplyScalar(progress);
        };
        return UtilsBezier;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewCenter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewComponent.ts', './ResLoader.ts', './GlobalEventManager.ts', './GlobalConfig.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, isValid, instantiate, Component, ViewComponent, ResLoader, ResType, GlobalEventManager, GlobalEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      isValid = module.isValid;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      ViewComponent = module.ViewComponent;
    }, function (module) {
      ResLoader = module.ResLoader;
      ResType = module.ResType;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }],
    execute: function () {
      var _dec, _class2, _class3;
      cclegacy._RF.push({}, "4db73JENftH4Kqh+UBTAw7H", "ViewCenter", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ViewData = function ViewData() {
        this.node = void 0;
        this.order = void 0;
        this.isLoading = void 0;
        this.name = void 0;
      };
      var ViewCenter = exports('ViewCenter', (_dec = ccclass('ViewCenter'), _dec(_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ViewCenter, _Component);
        function ViewCenter() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.uiParent = null;
          _this.viewDataCache = [];
          _this.viewDataStack = [];
          return _this;
        }
        var _proto = ViewCenter.prototype;
        _proto.onLoad = function onLoad() {
          ViewCenter.instance = this;
          GlobalEventManager.getInstance().on(GlobalEvent.AddViewInCanvas, this.addViewInCanvas, this);
        };
        _proto.addViewInCanvas = function addViewInCanvas(node) {
          var data = this.viewDataCache.find(function (t) {
            return t.name == node.name;
          });
          if (!data || !data.node || !isValid(data.node)) {
            node.active = false;
            data = new ViewData();
            data.node = node;
            data.name = node.name;
            if (node.getComponent(ViewComponent)) data.order = node.getComponent(ViewComponent).order;
            this.viewDataCache.push(data);
          }
        };
        _proto.show = function show(viewName, params, order) {
          var _this2 = this;
          if (!viewName) return;
          for (var _iterator = _createForOfIteratorHelperLoose(this.viewDataCache), _step; !(_step = _iterator()).done;) {
            var _data = _step.value;
            if (_data.isLoading) continue;
            if (!_data.node || !isValid(_data.node)) this.viewDataCache.splice(this.viewDataCache.indexOf(_data), 1);
          }
          var data = this.viewDataCache.find(function (t) {
            return t.name == viewName;
          });
          if (data != null && data.isLoading) return;
          if (data && data.node && isValid(data.node)) {
            var _data$node$getCompone;
            if ((_data$node$getCompone = data.node.getComponent(ViewComponent)) != null && _data$node$getCompone.canReplace) {
              this.hide(viewName);
              this.show(viewName, params, order);
              return;
            }
            if (data.node.active) return;
            if (data.node.getComponent(ViewComponent)) data.node.getComponent(ViewComponent).params = params;
            if (this.isExclusive(data.node)) this.addStackView(data);
            data.node.active = true;
            this.updateViewOrder();
            GlobalEventManager.getInstance().emit(GlobalEvent.OnViewEnable, data.node, true);
          } else {
            var viewData = new ViewData();
            viewData.isLoading = true;
            viewData.name = viewName;
            viewData.order = order != null ? order : 0;
            this.viewDataCache.push(viewData);
            ResLoader.instance.load(viewName, ResType.Prefab, function (d) {
              var _viewData$node$getCom, _viewData$node$getCom2;
              if (!viewData) return;
              viewData.node = instantiate(d);
              viewData.node.parent = _this2.uiParent;
              if ((_viewData$node$getCom = viewData.node.getComponent(ViewComponent)) != null && _viewData$node$getCom.order) viewData.order = (_viewData$node$getCom2 = viewData.node.getComponent(ViewComponent)) == null ? void 0 : _viewData$node$getCom2.order;
              if (viewData.node.getComponent(ViewComponent)) viewData.node.getComponent(ViewComponent).params = params;
              viewData.isLoading = false;
              if (_this2.isExclusive(viewData.node)) _this2.addStackView(viewData);
              _this2.updateViewOrder();
              GlobalEventManager.getInstance().emit(GlobalEvent.OnViewEnable, viewData.node, true);
            }, function (err) {
              return viewData.isLoading = false;
            });
          }
        };
        _proto.hide = function hide(viewName) {
          if (!viewName) return;
          var data = this.viewDataCache.find(function (t) {
            return t.name == viewName;
          });
          if (data && data.node && isValid(data.node)) {
            if (this.isCache(data.node)) {
              data.node.active = false;
            } else {
              data.node.destroy();
              this.deleteViewData(viewName);
            }
            if (this.isExclusive(data.node)) this.popStackView();
            GlobalEventManager.getInstance().emit(GlobalEvent.OnViewEnable, data.node, false);
          } else {
            if (data != null && data.isLoading) {
              data.isLoading = false;
            }
            this.deleteViewData(viewName);
          }
        };
        _proto.getView = function getView(name) {
          var data = this.viewDataCache.find(function (t) {
            return t.name == name;
          });
          return data.node;
        };
        _proto.updateViewOrder = function updateViewOrder() {
          var _this3 = this;
          this.viewDataCache = this.viewDataCache.sort(function (a, b) {
            return a.order - b.order;
          });
          var index = 0;
          var _loop = function _loop() {
            var node = _step2.value;
            if (!_this3.viewDataCache.find(function (t) {
              return t.node == node;
            })) {
              index++;
            }
          };
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.uiParent.children), _step2; !(_step2 = _iterator2()).done;) {
            _loop();
          }
          this.viewDataCache.forEach(function (data, i) {
            var _data$node;
            (_data$node = data.node) == null || _data$node.setSiblingIndex(index + i);
          });
        };
        _proto.addStackView = function addStackView(data) {
          if (this.viewDataStack.length > 0) this.viewDataStack[this.viewDataStack.length - 1].node.active = false;
          if (!this.viewDataStack.find(function (t) {
            return t.name == data.name;
          })) this.viewDataStack.push(data);
        };
        _proto.popStackView = function popStackView() {
          this.viewDataStack.pop();
          if (this.viewDataStack.length > 0) this.show(this.viewDataStack[this.viewDataStack.length - 1].name);
        };
        _proto.deleteViewData = function deleteViewData(viewName) {
          var index = this.viewDataCache.findIndex(function (t) {
            return t.name == viewName;
          });
          if (index >= 0) {
            delete this.viewDataCache[index];
            this.viewDataCache.splice(index, 1);
          }
        };
        _proto.isCache = function isCache(node) {
          var _node$getComponent;
          return (_node$getComponent = node.getComponent(ViewComponent)) == null ? void 0 : _node$getComponent.isCache;
        };
        _proto.isExclusive = function isExclusive(node) {
          var _node$getComponent2;
          return (_node$getComponent2 = node.getComponent(ViewComponent)) == null ? void 0 : _node$getComponent2.isExclusive;
        };
        return ViewCenter;
      }(Component), _class3.instance = void 0, _class3)) || _class2));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewCenter.ts', './GlobalEventManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Tween, tween, Component, ViewCenter, GlobalEventManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      ViewCenter = module.ViewCenter;
    }, function (module) {
      GlobalEventManager = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "01b2b70GIhIrKoHfggS1kIT", "ViewComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ViewComponent = exports('ViewComponent', (_dec = ccclass('ViewComponent'), _dec2 = menu("1-UIView/ViewComponent"), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ViewComponent, _Component);
        function ViewComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "isCache", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isExclusive", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "canReplace", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "order", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "delayCloseTime", _descriptor5, _assertThisInitialized(_this));
          _this.params = void 0;
          _this.delayTween = void 0;
          return _this;
        }
        var _proto = ViewComponent.prototype;
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.close = function close() {
          if (this.delayTween) return;
          if (this.delayCloseTime) this.delayHide(this.delayCloseTime);else ViewCenter.instance.hide(this.node.name);
        };
        _proto.delayHide = function delayHide(delayTime) {
          var _this2 = this;
          Tween.stopAllByTag(this.delayTween);
          this.delayTween = tween(this.node).delay(delayTime).call(function () {
            ViewCenter.instance.hide(_this2.node.name);
          }).start();
        };
        return ViewComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isCache", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isExclusive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "canReplace", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "order", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "delayCloseTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewInCanvasMarker.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './GlobalConfig.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, GlobalEventManager, GlobalEvent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "3cf53Aq2ihHBb6tdicpD5HI", "ViewInCanvasMarker", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ViewInCanvasMarker = exports('ViewInCanvasMarker', (_dec = ccclass('ViewInCanvasMarker'), _dec2 = menu("1-UIView/ViewInCanvasMarker"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ViewInCanvasMarker, _Component);
        function ViewInCanvasMarker() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = ViewInCanvasMarker.prototype;
        _proto.onLoad = function onLoad() {
          GlobalEventManager.getInstance().emit(GlobalEvent.AddViewInCanvas, this.node);
        };
        return ViewInCanvasMarker;
      }(Component)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewManageCenter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './GlobalConfig.ts', './ViewCenter.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, GlobalEventManager, GlobalEvent, GlobalViewDef, ViewCenter;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      GlobalEvent = module.GlobalEvent;
      GlobalViewDef = module.GlobalViewDef;
    }, function (module) {
      ViewCenter = module.ViewCenter;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "29055Ff3i5K67sKAJeio5/T", "ViewManageCenter", undefined);
      // import AdManager, { PlatformEvent } from '../../../../cocos-multi-platform/AdManager';
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ViewManageCenter = exports('ViewManageCenter', (_dec = ccclass('ViewManageCenter'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ViewManageCenter, _Component);
        function ViewManageCenter() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = ViewManageCenter.prototype;
        _proto.start = function start() {
          GlobalEventManager.getInstance().on(GlobalEvent.FloatingTip, this.onFloatingTipListener, this);
          GlobalEventManager.getInstance().on(GlobalEvent.BlockInput, this.onBlockInputListener, this);
          // AdManager.instance?.on(PlatformEvent.VideoShowing, this.onVideoShowingListener, this);
          // AdManager.instance?.on(PlatformEvent.VideoShowOver, this.onVideoShowingOverListener, this);
          // AdManager.instance?.on(PlatformEvent.VideoErr, this.onVideoShowErrListener, this);
        };

        _proto.update = function update(deltaTime) {};
        _proto.onFloatingTipListener = function onFloatingTipListener(content) {
          ViewCenter.instance.show(GlobalViewDef.FloatingView, content, 1);
        };
        _proto.onVideoShowingListener = function onVideoShowingListener() {
          this.onBlockInputListener(true);
        };
        _proto.onVideoShowingOverListener = function onVideoShowingOverListener() {
          this.onBlockInputListener(false);
        };
        _proto.onVideoShowErrListener = function onVideoShowErrListener() {
          this.onFloatingTipListener("视频拉取失败，请稍后尝试");
        };
        _proto.onBlockInputListener = function onBlockInputListener(enable) {
          if (enable) ViewCenter.instance.show(GlobalViewDef.BlockInputView, null, 999);else ViewCenter.instance.hide(GlobalViewDef.BlockInputView);
        };
        return ViewManageCenter;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewParentMarker.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewCenter.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component, ViewCenter;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      ViewCenter = module.ViewCenter;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "26d73fc+vJMQ7JjOdJvXVwL", "ViewParentMarker", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        menu = _decorator.menu;
      var ViewParentMarker = exports('ViewParentMarker', (_dec = ccclass('ViewParentMarker'), _dec2 = menu("1-UIView/ViewParentMarker"), _dec3 = property(Node), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ViewParentMarker, _Component);
        function ViewParentMarker() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ViewParentMarker.prototype;
        _proto.onLoad = function onLoad() {
          var _this$target;
          ViewCenter.instance.uiParent = (_this$target = this.target) != null ? _this$target : this.node;
        };
        return ViewParentMarker;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewPortFollow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GlobalEventManager.ts', './UIConstant.ts', './ExInteger.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, UITransform, lerp, Component, GlobalEventManager, UIEvent, ExInteger;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UITransform = module.UITransform;
      lerp = module.lerp;
      Component = module.Component;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      UIEvent = module.UIEvent;
    }, function (module) {
      ExInteger = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "36f34JZwrxGRbI4Ov/QsF7b", "ViewPortFollow", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ViewPortFollow = exports('ViewPortFollow', (_dec = ccclass('ViewPortFollow'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ViewPortFollow, _Component);
        function ViewPortFollow() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));
          //可跟随移动的范围
          _initializerDefineProperty(_this, "area", _descriptor2, _assertThisInitialized(_this));
          _this.limitXMin = 0;
          _this.limitXMax = 0;
          _this.limitYMin = 0;
          _this.limitYMax = 0;
          _this.startY = 0;
          return _this;
        }
        var _proto = ViewPortFollow.prototype;
        _proto.start = function start() {
          this.startY = this.target.position.y;
          this.updateArea();
          GlobalEventManager.getInstance().on(UIEvent.NodeScaleChange, this.updateArea, this);
        };
        _proto.onDestroy = function onDestroy() {
          GlobalEventManager.getInstance().off(UIEvent.NodeScaleChange, this.updateArea, this);
        };
        _proto.update = function update(deltaTime) {
          if (!this.target) return;
          if (!ViewPortFollow.canUpdate.cur) return;
          var pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(this.target.getWorldPosition()).negative();
          pos.y = this.area.position.y - (this.target.position.y - this.startY);
          // pos.multiplyScalar(this.node.scale.x);
          if (pos.x > this.limitXMax) pos.x = this.limitXMax;else if (pos.x < this.limitXMin) pos.x = this.limitXMin;
          if (pos.y > this.limitYMax) pos.y = this.limitYMax;else if (pos.y < this.limitYMin) pos.y = this.limitYMin;
          pos.x = lerp(this.node.position.x, pos.x, 0.1);
          pos.y = lerp(this.node.position.y, pos.y, 0.1);
          this.node.setPosition(pos);
        };
        _proto.updateArea = function updateArea() {
          var pos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(this.area.getWorldPosition());
          var areaTransform = this.area.getComponent(UITransform);
          this.limitXMin = pos.x - areaTransform.width * areaTransform.anchorX * this.node.scale.x;
          this.limitXMax = pos.x + areaTransform.width * areaTransform.anchorX * this.node.scale.x;
          this.limitYMin = pos.y - areaTransform.height * areaTransform.anchorY * this.node.scale.y;
          this.limitYMax = pos.y + areaTransform.height * (1 - areaTransform.anchorY) * this.node.scale.y;
        };
        return ViewPortFollow;
      }(Component), _class3.canUpdate = new ExInteger().init(0), _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "area", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VitComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UserVitComponent.ts', './GlobalEventManager.ts', './Utils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, Component, UserVitComponent, VitEvent, GlobalEventManager, Utils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      UserVitComponent = module.default;
      VitEvent = module.VitEvent;
    }, function (module) {
      GlobalEventManager = module.default;
    }, function (module) {
      Utils = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "8dca6ffYldNg54wyzxFeN+h", "VitComponent", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var VitComponent = exports('default', (_dec = property(Label), _dec2 = property(Label), _dec3 = property(Node), ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(VitComponent, _Component);
        function VitComponent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "labelVit", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelCountdown", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nodeInfinity", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "unlimitedTip", _descriptor4, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = VitComponent.prototype;
        // LIFE-CYCLE CALLBACKS:
        _proto.onLoad = function onLoad() {
          UserVitComponent.instance.data.vit.addChangeListener(this.onVitUpdateListener, this);
          UserVitComponent.instance.data.unlimitedVideoTime.addChangeListener(this.onVitUnlimitedListener, this);
          GlobalEventManager.getInstance().on(VitEvent.Recovery, this.onVitRecoveryListener, this);
        };
        _proto.onDestroy = function onDestroy() {
          UserVitComponent.instance.data.vit.removeChangeListener(this.onVitUpdateListener, this);
          UserVitComponent.instance.data.unlimitedVideoTime.removeChangeListener(this.onVitUnlimitedListener, this);
          GlobalEventManager.getInstance().clear(this);
        };
        _proto.start = function start() {
          this.nodeInfinity.active = UserVitComponent.instance.isUnlimited();
          this.labelCountdown.string = "";
          this.labelVit.string = this.nodeInfinity.active ? "" : UserVitComponent.instance.data.vit.cur + "/" + UserVitComponent.instance.data.vit.max;
        };
        _proto.onVitUnlimitedListener = function onVitUnlimitedListener() {
          if (UserVitComponent.instance.isUnlimited()) {
            this.labelVit.string = "";
            this.labelCountdown.string = "";
            this.nodeInfinity.active = true;
          }
        };
        _proto.onVitUpdateListener = function onVitUpdateListener(vit) {
          this.labelVit.string = vit + "/" + UserVitComponent.instance.max;
          if (UserVitComponent.instance.data.vit.isMax()) this.labelCountdown.string = "";
        };
        _proto.onVitRecoveryListener = function onVitRecoveryListener(time) {
          this.labelCountdown.string = UserVitComponent.instance.isUnlimited() || UserVitComponent.instance.data.vit.isMax() ? "" : Utils.getTimeStr(time);
        };
        return VitComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelVit", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labelCountdown", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeInfinity", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "unlimitedTip", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "今天已经是无限体力了";
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});