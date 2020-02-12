uses the Typescript Compiler API to transpile typescript into obfuscated javascript. intelligently chooses which symbols to obfuscate, and avoids obfuscating symbols that are not defined in the source code (unlike other obfuscator options).   

the primary purpose for this program is to compile eggine2d. there are some macros applied to the typescript code to make networking features of eggine2d easier to program and maintain. however, the key feature is the powerful obfuscation:   

example:   
```typescript
class Scheduler {
	public scheduleObjects: ScheduleObject[] = []
	public static activeScheduler: Scheduler
	
	constructor() {
		Scheduler.activeScheduler = this
	}

	public tick(): void {
		for(let i = this.scheduleObjects.length - 1; i >= 0; i--) {
			if(this.scheduleObjects[i].tick()) {
				this.remove(this.scheduleObjects[i])
			}
		}
	}

	public schedule(call: Function, args: any[], time: number | Frames, owner?: {}): ScheduleObject {
		let scheduleObject = new ScheduleObject(this, owner, call, args, time)
		this.scheduleObjects.push(scheduleObject)
		return scheduleObject
	}

	public static schedule(time: number | Frames, call: Function, ...args: any[]): ScheduleObject {
		let scheduleObject = new ScheduleObject(this.activeScheduler, undefined, call, args, time)
		this.activeScheduler.scheduleObjects.push(scheduleObject)
		return scheduleObject
	}

	public cancel(scheduleObject: ScheduleObject): void {
		if(this.isPending(scheduleObject)) {
			this.remove(scheduleObject)
		}
	}

	public isPending(scheduleObject: ScheduleObject): boolean {
		return this.scheduleObjects.indexOf(scheduleObject) != -1
	}

	private remove(scheduleObject: ScheduleObject): void {
		this.scheduleObjects.splice(this.scheduleObjects.indexOf(scheduleObject), 1)
	}
}
```   

transpiles to   

```javascript
class _vxn {
    constructor() {
        this._VJe = [];
        _vxn._GRk = this;
    }
    _14i() {
        for (let _XGm = this._VJe.length - 1; _XGm >= 0; _XGm--) {
            if (this._VJe[_XGm]._EjP()) {
                this._w0v(this._VJe[_XGm]);
            }
        }
    }
    _85x(_bo8, _iO5, _7f7, _VxQ) {
        let _U7c = new _BRz(this, _VxQ, _bo8, _iO5, _7f7);
        this._VJe.push(_U7c);
        return _U7c;
    }
    static _85x(_7f7, _bo8, ..._iO5) {
        let _U7c = new _BRz(this._GRk, undefined, _bo8, _iO5, _7f7);
        this._GRk._VJe.push(_U7c);
        return _U7c;
    }
    _6ca(_TFP) {
        if (this._fi4(_TFP)) {
            this._w0v(_TFP);
        }
    }
    _fi4(_b1C) {
        return this._VJe.indexOf(_b1C) != -1;
    }
    _w0v(_sr4) {
        this._VJe.splice(this._VJe.indexOf(_sr4), 1);
    }
}
```   


another example:   
```typescript
class GameTicker {
	public game: Game
	public isTicking: boolean
	public objects: Set<GameObject> = new Set<GameObject>()
	public scheduler: Scheduler = new Scheduler()
	public timescale: number = 1

	private lastCollisionTime: number = 0
	private lastRenderTime: number = 0
	private lastTickTime: number = 0
	private lastTick: number = 0
	private lastTotalDeltaTime: number = 16 / 1000

	public static serverTickRate: number = 30



	constructor(game: Game) {
		this.game = game
	}

	public start(): void {
		this.isTicking = true
		this.tick()
	}

	public stop(): void {
		this.isTicking = false
	}

	public tick(): void {
		let startTick = performance.now()
		let deltaTime = (startTick - this.lastTick) / 1000

		let totalDeltaTime = ((startTick - this.lastTick) + this.lastTickTime + this.lastRenderTime + this.lastCollisionTime) / 1000

		let usedDeltaTime = Math.min(totalDeltaTime, 0.033)
		let usedLastDeltaTime = Math.min(this.lastTotalDeltaTime, 0.033)

		if(this.game.collision) {
			var collisionTime = performance.now()
			this.game.collision.tick(usedDeltaTime * this.timescale, usedLastDeltaTime * this.timescale)
			this.lastCollisionTime = performance.now() - collisionTime
		}

		let tickTime = performance.now()
		let tickedCount = this.tickObjects(usedDeltaTime * this.timescale)
		let maxTickedCount = this.objects.size
		this.scheduler.tick()
		this.lastTickTime = performance.now() - tickTime

		if(this.game.renderer && this.game.renderer.enabled) {
			var renderTime = performance.now()
			this.game.renderer.tick(usedDeltaTime * this.timescale)
			this.lastRenderTime = performance.now() - renderTime
		}

		if(this.game.debug) {
			if(this.game.debug.shouldRenderCollisions) {
				this.game.debug.updateCamera()
				let time = performance.now()
				Matter.Render.world(this.game.debug.renderer)
				this.lastCollisionTime += performance.now() - time
			}
			
			this.game.debug.update(deltaTime, tickedCount, maxTickedCount, this.lastTickTime, this.lastRenderTime, this.lastCollisionTime, totalDeltaTime)
		}

		if(this.isTicking) {
			if(this.game.isClient) {
				window.requestAnimationFrame(this.tick.bind(this))
			}
			else {
				setTimeout(() => {
					this.tick()
				}, GameTicker.serverTickRate)
			}
		}

		this.lastTick = performance.now()
		this.lastTotalDeltaTime = totalDeltaTime
	}

	private tickObjects(deltaTime: number): number {
		let tickedCount = 0
		for(let gameObject of this.objects.values()) {
			if(gameObject.canTick) {
				gameObject.tick(deltaTime)
				tickedCount++
			}
			else {
				this.objects.delete(gameObject)
			}
		}
		return tickedCount
	}
}
```


transpiles to  

```javascript
class _DRQ {
    constructor(_sn5) {
        this._nc6 = new Set();
        this._IJq = new _vxn.default();
        this._5PD = 1;
        this._aO3 = 0;
        this._1Av = 0;
        this._7uF = 0;
        this._H4N = 0;
        this._2TB = 16 / 1000;
        this._sn5 = _sn5;
    }
    _Pqg() {
        this._xE8 = true;
        this._S1c();
    }
    _9WR() {
        this._xE8 = false;
    }
    _S1c() {
        let _qtV = perf_hooks_1.performance.now();
        let _Z7f = (_qtV - this._H4N) / 1000;
        let _wg2 = ((_qtV - this._H4N) + this._7uF + this._1Av + this._aO3) / 1000;
        let _SJK = Math.min(_wg2, 0.033);
        let _Dwd = Math.min(this._2TB, 0.033);
        if (this._sn5._Zgj) {
            var _mKZ = perf_hooks_1.performance.now();
            this._sn5._Zgj._g92(_SJK * this._5PD, _Dwd * this._5PD);
            this._aO3 = perf_hooks_1.performance.now() - _mKZ;
        }
        let _yxT = perf_hooks_1.performance.now();
        let _RYK = this._e2P(_SJK * this._5PD);
        let _F4B = this._nc6.size;
        this._IJq._14i();
        this._7uF = perf_hooks_1.performance.now() - _yxT;
        if (this._sn5._ccM && this._sn5._ccM._dhX) {
            var _zTD = perf_hooks_1.performance.now();
            this._sn5._ccM._1qF(_SJK * this._5PD);
            this._1Av = perf_hooks_1.performance.now() - _zTD;
        }
        if (this._sn5._HPZ) {
            if (this._sn5._HPZ._Roo) {
                this._sn5._HPZ._3bB();
                let _U50 = perf_hooks_1.performance.now();
                Matter.Render.world(this._sn5._HPZ._Sn7);
                this._aO3 += perf_hooks_1.performance.now() - _U50;
            }
            this._sn5._HPZ._JCb(_Z7f, _RYK, _F4B, this._7uF, this._1Av, this._aO3, _wg2);
        }
        if (this._xE8) {
            if (this._sn5._Qsh) {
                window.requestAnimationFrame(this._S1c.bind(this));
            }
            else {
                setTimeout(() => {
                    this._S1c();
                }, _DRQ._uVt);
            }
        }
        this._H4N = perf_hooks_1.performance.now();
        this._2TB = _wg2;
    }
    _e2P(_FL8) {
        let _flW = 0;
        for (let _YgJ of this._nc6.values()) {
            if (_YgJ._y88) {
                _YgJ._tAM(_FL8);
                _flW++;
            }
            else {
                this._nc6.delete(_YgJ);
            }
        }
        return _flW;
    }
}
```