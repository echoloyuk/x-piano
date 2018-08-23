'use strict';

export default class Piano extends HTMLElement {
    static get observedAttributes() {
        return [
            'ui-only',
            'type',
            'volume',
            'octave',
            'transpose',
            'glide',
            'attack',
            'decay',
            'sustain',
            'release'
        ];
    }

    /** @override */
    constructor(state = {}) {
        super();

        this.attachShadow({ mode : 'open' });
        this.state = state;
        this.isDown = false;
    }

    setState(newState) {
        this.state = Object.assign({}, this.state, newState);
        this.render();
    }

    onMouseDown(event) {
        event.currentTarget.classList.add('-on');

        this.isDown = true;

        if (this.hasAttribute('ui-only')) {
            return;
        }

        const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);

        if (this.type === 'piano') {
            X('oneshot').start(index);
        } else if (this.type === 'noise') {
            X('noise').start();
        } else {
            const frequency = X.toFrequencies(index);
            X('oscillator').start(frequency);
        }
    }

    onMouseUp(event) {
        event.currentTarget.classList.remove('-on');

        this.isDown = false;

        if (this.hasAttribute('ui-only')) {
            return;
        }

        const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);

        if (this.type === 'piano') {
            X('oneshot').stop(index);
        } else if (this.type === 'noise') {
            X('noise').stop();
        } else {
            X('oscillator').stop();
        }
    }

    onMouseEnter(event) {
        if (!this.isDown) {
            return;
        }

        event.currentTarget.classList.add('-on');

        if (this.hasAttribute('ui-only')) {
            return;
        }

        const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);

        if (this.type === 'piano') {
            X('oneshot').start(index);
        } else if (this.type === 'noise') {
            X('noise').start();
        } else {
            const frequency = X.toFrequencies(index);
            X('oscillator').start(frequency);
        }
    }

    onMouseLeave(event) {
        if (!this.isDown) {
            return;
        }

        event.currentTarget.classList.remove('-on');

        if (this.hasAttribute('ui-only')) {
            return;
        }

        const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);

        if (this.type === 'piano') {
            X('oneshot').stop(index);
        } else if (this.type === 'noise') {
            X('noise').stop();
        } else {
            X('oscillator').stop();
        }
    }

    setAttributes() {
        X('oscillator').param('mastervolume', this.getAttribute('volume'));
        X('oscillator').module('glide').param('time', this.getAttribute('glide'));
        X('oscillator').module('envelopegenerator').param('attack', this.getAttribute('attack'));
        X('oscillator').module('envelopegenerator').param('decay', this.getAttribute('decay'));
        X('oscillator').module('envelopegenerator').param('sustain', this.getAttribute('sustain'));
        X('oscillator').module('envelopegenerator').param('release', this.getAttribute('release'));

        this.type = this.getAttribute('type');

        if ((this.type !== 'piano') || (this.type !== 'noise')) {
            X('oscillator').get(0).param('type', this.type);
        }

        X('oscillator').get(0).param('octave', this.getAttribute('octave'));

        X('oneshot').param('mastervolume', this.getAttribute('volume'));
        X('oneshot').param('transpose', this.getAttribute('transpose'));
    }

    connectedCallback() {
        this.setAttributes();
        this.render();

        for (const key of this.shadowRoot.querySelectorAll('[role="button"]')) {
            key.addEventListener('mousedown',  this.onMouseDown.bind(this),  false);
            key.addEventListener('mouseup',    this.onMouseUp.bind(this),    false);
            key.addEventListener('mouseenter', this.onMouseEnter.bind(this), false);
            key.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
            key.addEventListener('touchstart', this.onMouseDown.bind(this),  false);
            key.addEventListener('touchend',   this.onMouseUp.bind(this),    false);
        }
    }

    disconnectedCallback() {
        for (const key of this.shadowRoot.querySelectorAll('[role="button"]')) {
            key.removeEventListener('mousedown',  this.onMouseDown.bind(this),  false);
            key.removeEventListener('mouseup',    this.onMouseUp.bind(this),    false);
            key.removeEventListener('mouseenter', this.onMouseEnter.bind(this), false);
            key.removeEventListener('mouseleave', this.onMouseLeave.bind(this), false);
            key.removeEventListener('touchstart', this.onMouseDown.bind(this),  false);
            key.removeEventListener('touchend',   this.onMouseUp.bind(this),    false);
        }
    }

    attributeChangedCallback() {
        this.setAttributes();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .Piano {
                    position: relative;
                    z-index: 1;
                    margin: 0 auto;
                    border-top: 44px solid #1b1b1b;
                    border-right: 16px solid #1b1b1b;
                    border-bottom: 16px solid #1b1b1b;
                    border-left: 16px solid #1b1b1b;
                    width: 1196px;
                    height: 150px;
                    transition: opacity ease 0.6s;
                }

                :host([loading]) .Piano {
                    opacity: 0.2;
                }

                .Piano__black {
                    position: absolute;
                    top: 0;
                    left: 4px;
                    z-index: 3;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    -webkit-flex-direction: row;
                    flex-direction: row;
                }

                .Piano__white {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    -webkit-flex-direction: row;
                    flex-direction: row;
                }

                .Piano li {
                    display: inline-block;
                    cursor: pointer;
                    user-select: none;
                }

                .Piano__black > li {
                    margin-left: 12px;
                    width: 11px;
                    height: 95px;
                    background-color: #555;
                    box-shadow: 0px -4px 0px 4px #000 inset;
                }

                .Piano__black > li.-on {
                    background-color: #000;
                }

                .Piano__white > li {
                    width: 23px;
                    height: 150px;
                    box-shadow: 0px -2px 0px 2px #ddd inset;
                }

                .Piano__white > li.-on {
                    background-color: #ddd;
                }

                .Piano li.-skip {
                    display: inline-block;
                    margin-left: 12px;
                    width: 11px;
                    height: 95px;
                    visibility: hidden;
                }
            </style>
            <div class="Piano">
                <ol class="Piano__black">
                    <li role="button" data-index="1" aria-label="1"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="4" aria-label="4"></li>
                    <li role="button" data-index="6" aria-label="6"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="9" aria-label="9"></li>
                    <li role="button" data-index="11" aria-label="11"></li>
                    <li role="button" data-index="13" aria-label="13"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="16" aria-label="16"></li>
                    <li role="button" data-index="18" aria-label="18"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="21" aria-label="21"></li>
                    <li role="button" data-index="23" aria-label="23"></li>
                    <li role="button" data-index="25" aria-label="25"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="28" aria-label="28"></li>
                    <li role="button" data-index="30" aria-label="30"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="33" aria-label="33"></li>
                    <li role="button" data-index="35" aria-label="35"></li>
                    <li role="button" data-index="37" aria-label="37"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="40" aria-label="40"></li>
                    <li role="button" data-index="42" aria-label="42"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="45" aria-label="45"></li>
                    <li role="button" data-index="47" aria-label="47"></li>
                    <li role="button" data-index="49" aria-label="49"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="52" aria-label="52"></li>
                    <li role="button" data-index="54" aria-label="54"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="57" aria-label="57"></li>
                    <li role="button" data-index="59" aria-label="59"></li>
                    <li role="button" data-index="61" aria-label="61"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="64" aria-label="64"></li>
                    <li role="button" data-index="66" aria-label="66"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="69" aria-label="69"></li>
                    <li role="button" data-index="71" aria-label="71"></li>
                    <li role="button" data-index="73" aria-label="73"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="76" aria-label="76"></li>
                    <li role="button" data-index="78" aria-label="78"></li>
                    <li class="-skip"></li>
                    <li role="button" data-index="81" aria-label="81"></li>
                    <li role="button" data-index="83" aria-label="83"></li>
                    <li role="button" data-index="85" aria-label="85"></li>
                </ol>
                <ol class="Piano__white">
                    <li role="button" data-index="0" aria-label="0"></li>
                    <li role="button" data-index="2" aria-label="2"></li>
                    <li role="button" data-index="3" aria-label="3"></li>
                    <li role="button" data-index="5" aria-label="5"></li>
                    <li role="button" data-index="7" aria-label="7"></li>
                    <li role="button" data-index="8" aria-label="8"></li>
                    <li role="button" data-index="10" aria-label="10"></li>
                    <li role="button" data-index="12" aria-label="12"></li>
                    <li role="button" data-index="14" aria-label="14"></li>
                    <li role="button" data-index="15" aria-label="15"></li>
                    <li role="button" data-index="17" aria-label="17"></li>
                    <li role="button" data-index="19" aria-label="19"></li>
                    <li role="button" data-index="20" aria-label="20"></li>
                    <li role="button" data-index="22" aria-label="22"></li>
                    <li role="button" data-index="24" aria-label="24"></li>
                    <li role="button" data-index="26" aria-label="26"></li>
                    <li role="button" data-index="27" aria-label="27"></li>
                    <li role="button" data-index="29" aria-label="29"></li>
                    <li role="button" data-index="31" aria-label="31"></li>
                    <li role="button" data-index="33" aria-label="33"></li>
                    <li role="button" data-index="34" aria-label="34"></li>
                    <li role="button" data-index="36" aria-label="36"></li>
                    <li role="button" data-index="38" aria-label="38"></li>
                    <li role="button" data-index="39" aria-label="39"></li>
                    <li role="button" data-index="41" aria-label="41"></li>
                    <li role="button" data-index="43" aria-label="43"></li>
                    <li role="button" data-index="44" aria-label="44"></li>
                    <li role="button" data-index="46" aria-label="46"></li>
                    <li role="button" data-index="48" aria-label="48"></li>
                    <li role="button" data-index="50" aria-label="50"></li>
                    <li role="button" data-index="51" aria-label="51"></li>
                    <li role="button" data-index="53" aria-label="53"></li>
                    <li role="button" data-index="55" aria-label="55"></li>
                    <li role="button" data-index="56" aria-label="56"></li>
                    <li role="button" data-index="58" aria-label="58"></li>
                    <li role="button" data-index="60" aria-label="60"></li>
                    <li role="button" data-index="62" aria-label="62"></li>
                    <li role="button" data-index="63" aria-label="63"></li>
                    <li role="button" data-index="65" aria-label="65"></li>
                    <li role="button" data-index="67" aria-label="67"></li>
                    <li role="button" data-index="68" aria-label="68"></li>
                    <li role="button" data-index="70" aria-label="70"></li>
                    <li role="button" data-index="72" aria-label="72"></li>
                    <li role="button" data-index="74" aria-label="74"></li>
                    <li role="button" data-index="75" aria-label="75"></li>
                    <li role="button" data-index="77" aria-label="77"></li>
                    <li role="button" data-index="79" aria-label="79"></li>
                    <li role="button" data-index="80" aria-label="80"></li>
                    <li role="button" data-index="82" aria-label="82"></li>
                    <li role="button" data-index="84" aria-label="84"></li>
                    <li role="button" data-index="86" aria-label="86"></li>
                    <li role="button" data-index="87" aria-label="87"></li>
                </ol>
            </div>
        `;
    }
}
