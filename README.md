x-piano
=========
  
Web Components for Web Audio API
  
## Overview
  
&lt;x-piano&gt; is GUI parts library (Web Components) for Web Applications that use Web Audio API.
&lt;x-piano&gt; has has the following features.
  
- Rich UI by Simple tag
- Play the One-Shot Audio
- Create Sound
- Simple Effector (Envelope Generator, Transpose, Glide)
  
## Demo
  
[x-piano](https://korilakkuma.github.io/x-piano/)
  
## Installation
  
    $ npm install x-piano
  
  or,
  
    $ bower install x-piano
  
## Usage
  
Describe &lt;x-piano&gt; tag.
  
    <x-piano></x-piano>
  
Moreover, &lt;x-piano&gt; tag can have some attributes.  
For example,
  
    <x-piano type="sawtooth" volume="0.4" attack="1" glide="1.5"></x-piano>
  
Refer to the following table for attribute details.
  
### Attributes
  
|  Attribute | Description                  | Value                                                                      |
|:-----------|:-----------------------------|:---------------------------------------------------------------------------|
| ui-only    | Not use sound                | boolean attribute                                                          |
| responsive | Responsive Layout            | boolean attribute                                                          |
| theme      | Piano Design                 | 'normal' (default), 'fiber', 'wood', 'crystal', 'flat', 'keyboard', 'none' |
| type       | Sound Source                 | 'piano' (default), 'sine', 'square', 'sawtooth', 'triangle'                |
| volume     | Master Volume                | 0.0 - 1.0 (1.0  by default)                                                |
| attack     | Envelope Generator (Attack)  | 0.0 - 1.0 (0.01 by default)                                                |
| decay      | Envelope Generator (Decay)   | 0.0 - 1.0 (0.3  by default)                                                |
| sustain    | Envelope Generator (Sustain) | 0.0 - 1.0 (1.0  by default)                                                |
| release    | Envelope Generator (Release) | 0.0 - 1.0 (1.0  by default)                                                |
| transpose  | Transpose                    | Integer   (0    by default)                                                |
| glide      | Glide (Oscillator only)      | 0.0 -     (0.0  by default)                                                |
| value      | Keyboard Index               | JSON (readonly)                                                            |
  
## License
  
Copyright (c) 2014 - 2018 Tomohiro IKEDA (Korilakkuma)  
Released under the MIT license
  