<template>
    <section>
        <!-- <div> -->
        <div class="flex flex-col mx-4 sm:mx-auto items-center mb-8 h-fit">
            <!-- <div class="text-center mt-8"> -->
            <!-- <div class="flex flex-col items-center justify-center mx-4"> -->
            <!-- <div class="box-border bg-white w-auto p-16 rounded-xl shadow-orange-300 shadow-xl py-4">
                        <div>
                            <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">ยินดีต้อนรับเข้าสู่ EE XVII
                                HOMECOMING</h1>
                            <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">งานจัดขึ้นในวันที่ 24
                                กุมภาพันธ์
                                2566</h1>
                            <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">ณ
                                ศูนย์ศิลปวัฒนธรรมเฉลิมพระเกียรติ</h1>
                            <h1 class="text-4xl text-gray-500 font-silpakorn mb-4">6 รอบพระชนมพรรษา</h1>
                        </div>
                    </div> -->
            <!-- </div> -->
            <!-- </div> -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-fit mt-4 mb-0">
                <div class="fade-anime1">
                    <div class="card drop-shadow-2xl"
                        style="display: flex;flex-direction: column;height: 100%;margin-top: auto;">
                        <div class="card-image">
                            <img draggable="false" src="/shirt.png" loading="lazy">
                        </div>
                        <!-- <div class="card-content">
                            <div class="content has-text-centered">
                                <h1 class="title is-4">หัวข้อ</h1>
                                <p class="title is-5">รายระเอียด</p>
                            </div>
                        </div> -->
                        <!-- 572 -->
                        <div class="card-footer" style="margin-top: auto;">
                            <b-button @click="$router.push('/store/shirt')"
                                style="border-top-right-radius: 0;border-top-left-radius: 0;" class="card-footer-item"
                                icon-left="cart" type="is-primary" size="is-large" expanded>ซื้อเสื้อ</b-button>
                        </div>
                    </div>
                </div>
                <div class="fade-anime2">
                    <div class="card drop-shadow-2xl"
                        style="display: flex;flex-direction: column;height: 100%;margin-top: auto;">
                        <div class="card-image">
                            <img draggable="false" src="/art.png" loading="lazy">
                        </div>
                        <!-- <div class="card-content mt-10">
                            <div class="content has-text-centered">
                                <h1 class="title is-4">หัวข้อ</h1>
                                <p class="title is-5">รายระเอียด</p>
                            </div>
                        </div> -->
                        <div class="card-footer" style="margin-top: auto;">
                            <b-button @click="$router.push('/store/ticket')"
                                style="border-top-right-radius: 0;border-top-left-radius: 0;" class="card-footer-item"
                                icon-left="cart" type="is-primary" size="is-large" expanded>จองโต๊ะ</b-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="grid grid-cols-3 gap-4 w-96 mt-4 mb-0 mt-6">
                    <b-button @click="$router.push('/store/ticket')" type="is-dark">จองโต๊ะ</b-button>
                    <b-button @click="$router.push('/store/shirt')" type="is-dark">ซื้อเสื้อ</b-button>
                    <b-button @click="$router.push('/store/shirt')" type="is-dark">ออกจากระบบ</b-button>
                </div> -->
        </div>
        <!-- </div> -->
    </section>
</template>
<script>
import anime from 'animejs/lib/anime.es.js';

export default {
    head() {
        return {
            title: "STORE - EE XVII HOMECOMING",
        }
    },
    auth: true,
    name: 'storeIndex',
    data() {
        return {
            data: null
        }
    },
    async mounted() {

        anime({
            targets: ".fade-anime1",
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
                    delay: 100,
                },
            ],
            duration: 0,
        });

        anime({
            targets: ".fade-anime2",
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

        // let {data} = await this.$auth.fetchUser()
        // console.log(data.type)
    },
}
</script>