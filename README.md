x-piano
=========
  
Web Components for Web Audio API
  
## Overview
  
&lt;x-piano&gt; is GUI parts library (Web Components) for Web Applications that use Web Audio API.
&lt;x-piano&gt; has has the following features.
  
- Rich UI by Simple tag
- Play the One-Shot Audio
- Create Sound
- Simple Effectors (Envelope Generator, Transpose, Glide)
  
## Demo
  
[x-piano](https://korilakkuma.github.io/x-piano/)
  
## Installation
  
```bash
$ npm install --save x-piano
```
  
## Usage
  
The &lt;x-piano&gt; requires 3 scripts.
  
```HTML
<script type="text/javascript" src="https://cdn.rawgit.com/Korilakkuma/XSound/master/build/xsound.js"></script>
<script type="module" src="src/components/index.js"></script>
<script defer nomodule src="build/app.js"></script>
```
  
Describe &lt;x-piano&gt; tag.
  
```HTML
<x-piano></x-piano>
```
  
Moreover, &lt;x-piano&gt; tag can have some attributes.  
For example,
  
```HTML
<x-piano type="sawtooth" volume="0.4" attack="1" glide="1.5"></x-piano>
```
  
Refer to the following table for attribute details.
  
### Attributes
  
|  Attribute | Description                  | Value                                                                                  |
|:-----------|:-----------------------------|:---------------------------------------------------------------------------------------|
| loading    | Apply style for loading      | boolean attribute                                                                      |
| ui-only    | Not use sound                | boolean attribute                                                                      |
| type       | Sound Source                 | 'piano' (default), 'sine', 'square', 'sawtooth', 'triangle', 'whitenoise', 'pinknoise' |
| volume     | Master Volume                | 0.0 - 1.0 (1.0  by default)                                                            |
| octave     | Octave (Oscillator only      | number                                                                                 |
| transpose  | Transpose (One-Shot only)    | Greater than or equal to 0.0 (0.0 by default)                                          |
| glide      | Glide (Oscillator only)      | Greater than or equal to 0.0 (0.0 by default)                                          |
| attack     | Envelope Generator (Attack)  | 0.0 - 1.0 (0.01 by default)                                                            |
| decay      | Envelope Generator (Decay)   | 0.0 - 1.0 (0.3  by default)                                                            |
| sustain    | Envelope Generator (Sustain) | 0.0 - 1.0 (1.0  by default)                                                            |
| release    | Envelope Generator (Release) | 0.0 - 1.0 (1.0  by default)                                                            |
  
## License
  
Copyright (c) 2014 - 2018 Tomohiro IKEDA (Korilakkuma)  
Released under the MIT license
  
