<template>
    <section>
        <div class="mt-4 has-text-centered fade-anime">
            <b-button class="w-36" @click="$router.push('/store/shirt')" type="is-dark">ย้อนกลับ</b-button>
        </div>
        <div class="flex flex-col items-center mx-auto mb-8 fade-anime">
            <div class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-2 rounded-2xl shadow-3xl">
                <h1 class="text-2xl font-bold">ประวัติการซื้อเสื้อ</h1>
                <b-table class="pt-4" :loading="loadingstate" :mobile-cards="false" :data="data">
                    <div id="start"></div>

                    <b-table-column centered label="ไซส์เสื้อ" width="300" numeric v-slot="props">
                        {{ props.row.size }}
                    </b-table-column>

                    <b-table-column centered label="จำนวนเสื้อ" width="300" numeric v-slot="props">
                        {{ props.row.count }}
                    </b-table-column>

                    <b-table-column centered label="ราคา" width="300" numeric v-slot="props">
                        {{ props.row.price }}
                    </b-table-column>

                    <b-table-column centered label="จ่ายเงิน" width="300" numeric v-slot="props">
                        <div v-if="!props.row.paid">
                            <NuxtLink :to="`/store/order/${props.row._id}`">
                                ดำเนินการต่อ</NuxtLink>
                        </div>
                    </b-table-column>

                    <b-table-column centered label="สถานะ" v-slot="props">
                        <span :class="['tag',
                            { 'is-success': (props.row.paid == true) },
                            { 'is-danger': (props.row.paid == false) }]">
                            {{ props.row.paid ? "ชำระเงินแล้ว" : "ยังไม่ชำระเงิน" }}
                        </span>
                    </b-table-column>
                    <template #empty>
                        <div class="has-text-centered">ไม่มีข้อมูลการสั่งซื้อ</div>
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
            title: "ประวัติการสั่งเสื้อ - EE XVII HOMECOMING",
        }
    },
    name: 'TicketHistoryIndex',
    data() {
        return {
            loadingstate: true,
            data: [
                // { 'id': 1, 'price': 5000 },
            ],
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
            const response = await this.$axios.get("/api/history/getshirt")
            console.log(response.data.table)
            this.data = response.data.table
        } catch (error) {

        } finally {
            this.loadingstate = false
        }

    },
}
</script>