<template>
    <section>
        <!-- {{ this.$auth.user }} -->
        <div class="fade-anime flex flex-col items-center mx-auto mb-8">
            <!-- <div class="grid grid-cols-2 gap-4 w-96 mt-4 mb-0 ">
                <b-button @click="$router.push('/store')" type="is-dark">ย้อนกลับ</b-button>
                <b-button @click="$router.push('/history/ticket')" type="is-dark">ประวัติการจอง</b-button>
            </div> -->
            <div class="flex flex-col items-center bg-white h-fit w-fit p-4 mt-2 rounded-2xl shadow-3xl">
                <!-- <div> -->
                <img src="/map.svg" width="500rem" height="500rem">
                <!-- </div> -->
            </div>
            <div v-show="row" class="flex flex-col items-center bg-white h-auto w-fit p-4 mt-3 rounded-2xl shadow-3xl">
                <div>
                    <div class="grid grid-cols-4 gap-4 sm:gap-6 w-fit mx-auto">
                        <div v-for="i of this.row?.slice(0, 4)" :key="i.id">
                            <div @mouseover="mouseover" @mouseout="mouseout" @click="event_tk"
                                :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} ${(i.mouse_state == 1) ? 'ring ring-amber-400' : ''} h-10 w-10 sm:h-14 sm:w-14 rounded-full shadow-md hover:ring`">
                                <span :id="i.id"
                                    class="flex flex-col items-center normal-nums justify-center mx-auto h-full text-black font-bold select-none font-silpakorn">
                                    {{ (i.ismy && (i.status == 1)) ? "❌" : `${i.id + 1}` }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-8 gap-4 sm:gap-6 w-fit mx-auto mt-4">
                        <div v-for="i of this.row?.slice(4, this.row.length + 1)" :key="i.id">
                            <div @mouseover="mouseover" @mouseout="mouseout" @click="event_tk"
                                :class="`${(i.status == 2) ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : (i.status == 1) ? 'bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'} ${(i.mouse_state == 1) ? 'ring ring-amber-400' : ''} h-10 w-10 sm:h-14 sm:w-14 rounded-full shadow-md hover:ring`">
                                <span :id="i.id"
                                    class="flex flex-col items-center normal-nums justify-center mx-auto h-full text-black font-bold select-none font-silpakorn">
                                    {{ (i.ismy && (i.status == 1)) ? "❌" : `${i.id + 1}` }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center bg-white h-auto w-fit p-4 mt-4 rounded-full">
                <span
                    class="shadow-md bg-orange-500 hover:bg-orange-600 cursor-pointer h-8 w-8 sm:h-14 sm:w-14 rounded-full hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">ว่าง</p>
                <span
                    class="shadow-md bg-yellow-400 hover:bg-yellow-500 cursor-not-allowed h-8 w-8 sm:h-14 sm:w-14 rounded-full hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">กำลังจอง</p>
                <span
                    class="shadow-md bg-gray-500 hover:bg-gray-600 cursor-not-allowed h-8 w-8 sm:h-14 sm:w-14 rounded-full hover:ring">
                </span>
                <p class="text-xl px-3 font-bold">
                    จองแล้ว
                </p>
            </div>
            <div v-if="this.claim_by_me.length != 0">
                <div class="flex flex-col items-center bg-white h-auto w-auto p-4 mt-4 mb-6 rounded-2xl">
                    <b-steps v-model="activeStep" :has-navigation="false">
                        <b-step-item step="0" label="สรุปรายการ">
                            <div>
                                <h1 class="has-text-centered title is-5">เวลาที่เหลือ {{ this.stopwatch }}</h1>
                                <h2 class="has-text-centered subtitle is-7" style="color: red">
                                    *เวลาที่เหลือนับจากโต๊ะแรกที่กดจอง</h2>
                                <hr>
                                <div>
                                    <table
                                        class="table-auto rounded-xl border-slate-300 border-dotted border-2 w-80 sm:w-96">
                                        <thead>
                                            <tr>
                                                <th>&nbsp;&nbsp;หมายเลขโต๊ะ</th>
                                                <th>ราคา</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="i of this.claim_by_me" :key="i.id">
                                                <td>&nbsp;&nbsp;{{ i.id + 1 }}</td>
                                                <td>{{ (user_type == 'new' ? Number(1760) : Number(4800)).toLocaleString()
                                                }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="font-bold mt-2 mx-44 sm:mx-60 mr-auto">
                                    ราคารวม {{ (Number(user_type == 'new' ? Number(1760) :
                                        Number(4800)) * this.claim_by_me.length).toLocaleString() }} บาท
                                </div>
                            </div>
                        </b-step-item>
                        <b-step-item step="1" label="ชำระเงิน">
                            <!-- {{ activeStep }} -->
                            <h1 class="has-text-centered title is-5">เวลาที่เหลือ {{ this.stopwatch }}</h1>
                            <h2 class="has-text-centered subtitle is-7" style="color: red">
                                *เวลาที่เหลือนับจากโต๊ะแรกที่กดจอง</h2>
                            <hr>
                            <!-- <div class="font-bold has-text-centered text-xl">
                                จำนวนเงิน {{ (Number(user_type == 'new' ? Number(1760) :
                                    Number(4800)) * this.claim_by_me.length).toLocaleString() }} บาท
                            </div> -->
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
                                <p class="subtitle"> จำนวนเงิน {{ (Number(user_type == 'new' ? Number(1760) :
                                    Number(4800)) * this.claim_by_me.length).toLocaleString() }} บาท</p>
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
                        </b-step-item>
                        <hr>
                    </b-steps>
                    <div class="mt-0 mb-4">
                        <a v-if="activeStep == 1" @click="activeStep--"
                            class="drop-shadow-xl select-none bg-gradient-to-r from-neutral-800 to-gray-600 hover:brightness-125 hover:ring rounded-md py-3 px-8 text-white hover:text-white text-center font-bold">ย้อนกลับ</a>
                        <a v-if="this.activeStep != 1" @click="next_step"
                            class="drop-shadow-xl select-none hover:ring bg-gradient-to-r from-orange-600 to-orange-400 rounded-md py-3 px-8 text-white hover:text-white text-center font-bold">ถัดไป</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import anime from 'animejs/lib/anime.es.js';
import QrScanner from 'qr-scanner';
export default {
    auth: true,
    head() {
        return {
            title: "จองโต๊ะ - EE XVII HOMECOMING",
        }
    },
    name: 'ticket',
    data() {
        return {
            file: null,
            upload: {
                qrcode: null
            },
            activeStep: 0,
            loading_screen: null,
            row: null,
            user_type: null,
            claim_by_me: [],
            timeout: null,
            stopwatch: null,
            stw_intv: null
        }
    },
    async mounted() {
        clearInterval(this.stw_intv);

        anime({
            targets: ".fade-anime",
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


        this.socket = this.$nuxtSocket({
            // channel: '/',
            reconnection: false,
            autoConnect: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 1000,
            timeout: 10000,
            auth: {
                token: this.$auth.strategy.token.get()
            }
        });

        this.socket.on('table_list', (msg) => {
            let maped = msg.data.map((d) => {
                return { ...d, ismy: (d.claim == this.$auth.user), mouse_state: 0 }
            })
            this.row = maped;
            this.myclaim();
        });


        this.socket.on('table_update', (msg) => {
            this.activeStep = 0;
            this.row[msg.id]['status'] = msg.status;
            this.row[msg.id]['claim'] = msg.claim;
            this.row[msg.id]['ex_claim_date_time'] = msg.ex_claim_date_time;
            if ((msg.claim == this.$auth.user) && msg.status != 2) {
                this.row[msg.id]['ismy'] = true;
            } else {
                this.row[msg.id]['ismy'] = false;
            }
            this.myclaim();
        });

        this.socket.on("connect", () => {
            this.socket.emit("table_list");
        });


        this.socket.on("noti", (data) => {
            try {
                this.loading_screen.close();
            } catch (error) { }
            if (data.status == "success") {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${data?.message}`,
                    type: 'is-success',
                    hasIcon: true,
                    closable: true,
                    // queue: false,
                })
            } else if (data.status == "fail") {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${data?.message}`,
                    type: 'is-danger',
                    hasIcon: true,
                    closable: true,
                    queue: false,
                })
            }
        });

        this.socket.on('connect_error', (error) => {
            this.row = null;
            this.reconnect();
        });

        this.socket.on('disconnect', (reason) => {
            this.row = null;
            this.reconnect();
        });

        this.socket.on('table_mouseover', (data) => {
            if (data.user != this.$auth.user) {
                this.row[data.id]['mouse_state'] = 1;
            }
        });

        this.socket.on('table_mouseout', (data) => {
            if (data.user != this.$auth.user) {
                this.row[data.id]['mouse_state'] = 0;
            }
        });

        let { data } = await this.$auth.fetchUser();
        this.user_type = data.type;
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
                try {
                    const response = await this.$axios.post("/api/socket/ticket/upload", { ...this.upload });
                    this.$buefy.notification.open({
                        duration: 5000,
                        message: `${response?.data?.message}`,
                        type: 'is-success',
                        hasIcon: true,
                        closable: false,
                        queue: true,
                    })
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
        next_step() {
            if (this.activeStep < 1) {
                this.activeStep++;
            }
        },
        async myclaim() {
            this.claim_by_me = await this.row.filter((data) => {
                if (data.ismy && data.status == 1) {
                    return true
                }
            });
            var min = Math.min(...this.claim_by_me.map(item => {
                return new Date(item.ex_claim_date_time).getTime()
            }));
            if (min != Infinity) {
                this.timeout = min;
                this.tick_watch();
                clearInterval(this.stw_intv);
                this.stw_intv = setInterval(() => {
                    this.tick_watch();
                }, 100);
            }
        },
        tick_watch() {
            let timenow = new Date().getTime();
            let mSeconds = this.timeout - timenow;
            let minutes = Math.floor((((mSeconds % 31536000000) % 86400000) % 3600000) / 60000);
            let seconds = Math.floor(((((mSeconds % 31536000000) % 86400000) % 3600000) % 60000) / 1000);
            let f = '';
            if (minutes) {
                f += `${minutes} นาที `
            }
            if (seconds) {
                f += `${seconds} วินาที`
            }
            this.stopwatch = f;
        },
        gotostore() {
            this.$router.push('/store');
        },
        reconnect() {
            setTimeout(() => {
                this.socket.connect()
            }, 1000);
        },
        mouseover(el) {
            let b_data = this.row[el.target.id];
            this.socket.emit("table_mouseover", { id: b_data.id, user: this.$auth.user });
        },
        mouseout(el) {
            let b_data = this.row[el.target.id];
            this.socket.emit("table_mouseout", { id: b_data.id, user: this.$auth.user });
        },
        // remove_list_class(classList, list) {
        //     list.forEach(element => {
        //         classList.remove(element)
        //     });
        // },
        // add_list_class(classList, list) {
        //     list.forEach(element => {
        //         classList.add(element)
        //     });
        // },
        event_tk(el) {
            let b_data = this.row[el.target.id];
            if (b_data.status == 0) {
                this.loading_screen = this.$buefy.loading.open({ container: null });
                this.socket.emit("table_click", { id: b_data._id });
                this.clear_loading();
            } else if (b_data.status == 1 && b_data.ismy) {
                this.loading_screen = this.$buefy.loading.open({ container: null });
                this.socket.emit("table_unclick", { id: b_data._id });
                this.clear_loading();
            } else {
                return
            }
        },
        clear_loading() {
            setTimeout(() => {
                try {
                    this.loading_screen.close();
                } catch (error) { }
            }, 10000);
        },
        // get_table_list() {
        //     // this.socket.emit("table_list")
        //     // console.log()
        // }
    },
    destroyed() {
        clearInterval(this.stw_intv)
    }
}
</script>