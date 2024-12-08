<template>
    <section>
        <div class="fade-anime  mt-4 has-text-centered">
            <b-button class="w-36" @click="$router.push('/store/ticket')" type="is-dark">ย้อนกลับ</b-button>
        </div>
        <div class="fade-anime flex flex-col items-center mx-auto mb-8">
            <div class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-2 rounded-2xl shadow-3xl">
                <h1 class="text-2xl font-bold">ประวัติการจองโต๊ะ</h1>
                <b-table class="pt-4" :loading="loadingstate" :mobile-cards="false" :data="data" :columns="columns">
                    <template #empty>
                        <div class="has-text-centered">ไม่มีข้อมูลการจองโต๊ะ</div>
                    </template>
                </b-table>
            </div>
        </div>
    </section>
</template>
<script>
import anime from 'animejs/lib/anime.es.js';

export default {
    auth: true,
    head() {
        return {
            title: "ประวัติการจองโต๊ะ - EE XVII HOMECOMING",
        }
    },
    name: 'TicketHistoryIndex',
    data() {
        return {
            loadingstate: true,
            data: [
                // { 'id': 1, 'price': 5000 },
            ],
            columns: [
                {
                    field: 'id',
                    label: 'หมายเลขโต๊ะ',
                    width: '300',
                    numeric: true,
                    centered: true
                },
                {
                    field: 'price',
                    label: 'ราคา',
                    width: '300',
                    numeric: true,
                    centered: true
                },
            ]
        }
    },
    async mounted() {

        anime({
            targets: ".fade-anime",
            keyframes: [
                {
                    translateY: -300,
                    duration: 0,
                    opacity: 0,
                },
                {
                    translateY: 0,
                    duration: 800,
                    opacity: 1,
                    delay: 300,
                },
            ],
            duration: 0,
        });
        // let { data } = await this.$auth.fetchUser()
        // console.log(data.type)
        try {
            const response = await this.$axios.get("/api/history/get")

            this.data = response.data.table.map(data => {
                return {
                    id: data.id + 1, price: (Number(response.data.type == 'new' ? Number(1760) :
                        Number(4800))).toLocaleString()
                }
            })
        } catch (error) {

        } finally {
            this.loadingstate = false
        }

    },
}
</script>