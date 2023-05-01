<template>
  <!-- <div style="height: 300px;">
    <ul>
      <li><a href="#">home</a></li>
      <li><a href="#">archives</a></li>
      <li><a href="#">tags</a></li>
      <li><a href="#">categories</a></li>
      <li><a href="#">about</a></li>
    </ul>
  </div> -->
  <canvas id="oscilloscope" width="200" height="100"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Progress from '../components/Common/Progress.vue'
import { useMainStore } from '../store/index'
import { storeToRefs } from 'pinia'
import Lyrics from '../components/Common/Lyrics.vue'
import axios from 'axios'
import { readBinaryFile } from '@tauri-apps/api/fs';

const mainStore = useMainStore()
const { currentTime, duration, lyc, tlyric, romalrc } = storeToRefs(mainStore)

var audioCtx = new (window.AudioContext)();
var analyser = audioCtx.createAnalyser();
var canvasCtx: CanvasRenderingContext2D | null = null
var canvas: HTMLCanvasElement | null = null

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;




onMounted(() => {
  // 获取 ID 为 "oscilloscope" 的画布
  canvas = <HTMLCanvasElement>document.getElementById("oscilloscope");
  canvasCtx = canvas!.getContext("2d");

  draw();
})


// 绘制一个当前音频源的示波器
async function draw() {
  let dataArray = await readBinaryFile('E:\\学习\\2023-3\\download\\打ち上げ花火.mp3')
  analyser.getByteTimeDomainData(dataArray)


  analyser.getByteTimeDomainData(dataArray);

  canvasCtx!.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx!.fillRect(0, 0, canvas!.width, canvas!.height);
  canvasCtx!.lineWidth = 2;
  canvasCtx!.strokeStyle = 'rgb(0, 0, 0)';
  canvasCtx!.beginPath();

  var sliceWidth = canvas!.width * 1.0 / bufferLength;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 128.0;
    var y = v * canvas!.height / 2;
    if (i === 0) {
      canvasCtx!.moveTo(x, y);
    } else {
      canvasCtx!.lineTo(x, y);
    }
    x += sliceWidth;
  }

  canvasCtx!.lineTo(canvas!.width, canvas!.height / 2);
  canvasCtx!.stroke();
};

</script>

<style lang="less" scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: start;
  list-style-type: none;

  li {
    padding: 6px 0;

    a {
      --fill-color: #198CE6;
      position: relative;
      display: block;
      padding: 4px 0;
      font: 700 3rem Raleway, sans-serif;
      text-decoration: none;
      text-transform: uppercase;
      -webkit-text-stroke: 2px var(--fill-color);
      background: linear-gradient(var(--fill-color) 0 100%) left / 0 no-repeat;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      transition: 0.5s linear;

      &:hover {
        background-size: 100%;
      }
    }
  }
}

/* cyrillic-ext */
@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjMDr4fIA9c.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

/* cyrillic */
@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjMDrcfIA9c.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

/* vietnamese */
@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjMDrwfIA9c.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}

/* latin-ext */
@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjMDr0fIA9c.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Raleway';
  font-style: italic;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjMDrMfIA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* cyrillic-ext */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCAIT5lu.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

/* cyrillic */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCkIT5lu.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

/* vietnamese */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCIIT5lu.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}

/* latin-ext */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCMIT5lu.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyC0ITw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* cyrillic-ext */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCAIT5lu.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}

/* cyrillic */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCkIT5lu.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

/* vietnamese */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCIIT5lu.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}

/* latin-ext */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyCMIT5lu.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyC0ITw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>