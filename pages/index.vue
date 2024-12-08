<template>
  <section class="flex items-center justify-center h-screen">
    <div class="text-center">
      <img src="/gear.gif" alt="image" class="mx-auto mb-4 w-64 h-64">
      <h1 class="text-5xl text-gray-500 font-silpakorn mb-8">EE XVII HOMECOMING</h1>
      <!-- <h1 class="">Hello</h1> -->
      <nav>
        <NuxtLink to="/auth/login" class="text-5xl font-silpakorn mb-4">เข้าสู่ระบบ</NuxtLink>
        <span class="text-5xl text-gray-500">|</span>
        <NuxtLink to="/auth/register" class="text-5xl font-silpakorn mb-4">ลงทะเบียน</NuxtLink>
      </nav>
    </div>
  </section>
</template>

<script>
// const animes = require('animejs');
import anime from 'animejs/lib/anime.es.js';
export default {
  auth: false,
  name: 'IndexPage',
  data() {
    return {
      data: null
    }
  },
  mounted() {
    // anime({
    //   targets: 'img',
    //   rotate: '1turn',
    //   duration: 800
    // });
    // new Audio('./fade.mp3').play()
    // let audio = new Audio('fade.mp3');
    // // audio.play();

    // audio.addEventListener("canplaythrough", () => {
    //   audio.play().catch(e => {
    //     window.addEventListener('scroll', () => {
    //       audio.play()
    //     }, { once: true })
    //   })
    // });

    // anime({
    //   targets: "img",
    //   translateX: -400,
    //   duration: 0,
    // });

    // anime({
    //   targets: "img",
    //   translateX: 0,
    //   duration: 500,
    //   delay: 100,
    // });

    // anime({
    //   targets: 'img',
    //   translateX: -300,
    //   duration: 500,
    //   direction: 'reverse',
    //   easing: 'easeInOutSine'
    // });


    anime({
      targets: "img",
      keyframes: [
        { 
          translateX: -300,
          duration: 0,
          opacity: 0,
        },
        {
          translateX: 0,
          opacity: 1,
          duration: 800,
          delay: 100,
        },
      ],
      duration: 0,
    });



    anime({
      targets: "h1",
      keyframes: [
        {
          translateX: -300,
          duration: 0,
          opacity: 0,
        },
        {
          translateX: 0,
          duration: 800,
          opacity: 1,
          delay: 200,
        },
      ],
      duration: 0,
    });


    anime({
      targets: "nav",
      keyframes: [
        {
          translateX: -300,
          duration: 0,
          opacity: 0,
        },
        {
          translateX: 0,
          duration: 800,
          opacity: 1,
          delay: 300,
        },
      ],
      duration: 0,
    });

    // anime({
    //   targets: 'h1,nav',
    //   scale: 1.35,
    //   duration: 0,
    // })
    // anime({
    //   targets: 'h1,nav',
    //   scale: 1.0,
    //   duration: 800,
    //   delay: 100,
    // })

  },
}
</script>
