<template>
    <section>
        <div class="flex flex-col items-center mx-auto mb-8">
            <div class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-2 rounded-2xl shadow-3xl"
                v-if="!orders.paid">
                <h1 class="text-2xl font-bold">ชำระเงิน</h1>

                <div>
                    <hr>
                    <div>
                        <table class="table-auto rounded-xl border-slate-300 border-dotted border-2 w-80 sm:w-96">
                            <thead>
                                <tr>
                                    <th>&nbsp;&nbsp;ไซส์เสื้อ</th>
                                    <th>ราคา</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>&nbsp;&nbsp;{{ orders.size }} * {{ orders.count }} </td>
                                    <td>{{ Number(orders.price).toLocaleString() }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- <div class="font-bold mt-2 mx-44 sm:mx-60 mr-auto">
                        จำนวนเงิน {{ Number(orders.price).toLocaleString() }} บาท
                    </div> -->
                </div>

                <!-- <h1>{{ orders }}</h1> -->
                <div class="has-text-centered">
                    <!-- <b-image style="max-width: 250px;margin: auto;" src="/promptpay.png"></b-image> -->
                    <!-- <b-image class="pt-0" :src="`https://chart.googleapis.com/chart?cht=qr&chl=${qrcode}&chs=512x512&choe=UTF-8`"></b-image> -->
                    <h2 class="font-extrabold text-2xl pb-2">ธนาคารกรุงเทพ</h2>
                    <div @click="copytokip">
                        <b-tooltip position="is-right" label="กดเพื่อคัดลอก" always>
                            <p class="box-border border-2 font-medium text-xl select-text">6527078072</p>
                        </b-tooltip>
                    </div>
                    <p class="title is-5 pt-2">น.ส. จิดาภา เลาหสถิตย์</p>
                    <p class="subtitle"> จำนวนเงิน {{ Number(orders.price).toLocaleString() }} บาท</p>
                    <h2 class="has-text-centered subtitle is-6" style="color: red">
                        *กรุณาโอนเงินจำนวนนี้เท่านั้น ห้ามขาดห้ามเกิน</h2>
                </div>
                <hr>
                <form name="upload" @submit.prevent="upload_slip_func">
                    <b-field>
                        <b-upload accept="image/*" v-model="file" drag-drop expanded required>
                            <section class="section">
                                <div class="content has-text-centered">
                                    <p>
                                        <b-icon icon="upload" size="is-large">
                                        </b-icon>
                                    </p>
                                    <p>วางสลิปของคุณที่นี่ หรือคลิกเพื่ออัปโหลด</p>
                                </div>
                            </section>
                        </b-upload>
                    </b-field>
                    <div v-if="file?.name" class="tags">
                        <span class="tag is-primary is-medium">
                            {{ file?.name }}
                            <button class="delete is-medium" type="button" @click="file = null">
                            </button>
                        </span>
                    </div>
                    <div class="mt-3 buttons">
                        <b-button native-type="submit" type="is-primary" :disabled="file == null"
                            expanded>อัพโหลดข้อมูล</b-button>
                    </div>
                </form>
            </div>
            <div class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-2 rounded-2xl shadow-3xl"
                v-if="orders.paid">
                <h1 class="text-5xl text-natural font-silpakorn">ชำระเงินสำเร็จ</h1>
                <img src="/7efs.gif" alt="image" class="mx-auto mb-4 w-auto h-auto">
            </div>

        </div>
    </section>
</template>


<script>
import QrScanner from 'qr-scanner';
export default {
    auth: true,
    head() {
        return {
            title: "ชำระเงิน - EE XVII HOMECOMING",
        }
    },
    data() {
        return {
            file: null,
            upload: {
                qrcode: null,
                id: null
            },
        }
    },
    async asyncData(context) {
        let orders = await context.$axios.$get(`/api/user/order/${context.params?.id}`);
        return { orders: orders }
    },
    methods: {
        copytokip() {
            navigator.clipboard.writeText('6527078072');
            this.$buefy.toast.open('คัดลอกแล้ว')
        },
        async upload_slip_func() {
            const loadingComponent = this.$buefy.loading.open({ container: null });
            try {
                let { data } = await QrScanner.scanImage(this.file, { returnDetailedScanResult: true })
                this.upload.qrcode = data;
                this.upload.id = this.$route.params.id;
                try {
                    const response = await this.$axios.post("/api/user/order/upload", { ...this.upload });
                    this.$nuxt.refresh()
                    // console.log(response);
                } catch (error) {
                    this.$buefy.notification.open({
                        duration: 5000,
                        message: `${error?.response?.data?.message || error}`,
                        type: 'is-danger',
                        hasIcon: true,
                        closable: false,
                        queue: true,
                    })
                }
            } catch (error) {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${error}`,
                    type: 'is-danger',
                    hasIcon: true,
                    closable: true,
                    queue: false,
                })
            } finally {
                loadingComponent.close()
            }
        },
    },
    mounted() {
        // console.log()
    },
}
</script>