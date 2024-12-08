<template>
    <section>
        <div class="flex fade-anime flex-col sm:mx-auto items-center">
            <img src="/shirt.svg" alt="image" class="rounded-xl w-screen md:w-[50rem] mt-8">
            <div class="bg-white w-screen md:w-[50rem] rounded-xl shadow-orange-300 shadow-2xl mt-4 p-4 mb-8">
                <h1 class="text-4xl font-silpakorn mb-4 text-center">ซื้อเสื้อ</h1>
                <form name="order" @submit.prevent="order_func" autocomplete="on">
                    <b-field label-position="on-border" label="จำนวน:">
                        <b-select expanded required id="count" v-model="form_data.count" name="count">
                            <option value="1">1 ตัว</option>
                            <option value="2">2 ตัว</option>
                            <option value="3">3 ตัว</option>
                            <option value="4">4 ตัว</option>
                            <option value="5">5 ตัว</option>
                            <option value="6">6 ตัว</option>
                            <option value="7">7 ตัว</option>
                            <option value="8">8 ตัว</option>
                            <option value="9">9 ตัว</option>
                            <option value="10">10 ตัว</option>
                        </b-select>
                    </b-field>

                    <b-field label-position="on-border" label="ไซส์เสื้อ:">
                        <b-select expanded required id="count" v-model="form_data.size" name="count">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="2XL">2XL</option>
                            <option value="3XL">3XL</option>
                            <option value="4XL">4XL</option>
                        </b-select>
                    </b-field>

                    <b-field label-position="on-border" label="ชื่อ:">
                        <b-input required type="text" v-model="form_data.name" name="name"></b-input>
                    </b-field>

                    <b-field label-position="on-border" label="ที่อยู่">
                        <b-autocomplete required v-model="form_data.address_name" :data="result" placeholder="ค้นหาจากตำบล"
                            icon="magnify" clearable @select="option => selected = option">
                            <template #empty>ไม่พบตำบล</template>
                        </b-autocomplete>
                    </b-field>

                    <b-field label-position="on-border" label="ที่อยู่เพิ่มเติม:">

                        <b-input maxlength="200" type="textarea" required v-model="form_data.address_more"
                            placeholder="บ้านเลขที่,หมู่,ซอย,ถนน" name="address" rows="3"></b-input>
                    </b-field>

                    <b-field label-position="on-border" label="เบอร์โทร:">
                        <b-input required type="tel" v-model="form_data.phone_number" name="tel"></b-input>
                    </b-field>

                    <div class="buttons">
                        <b-button native-type="submit" type="is-primary" expanded>สั้งซื้อ</b-button>
                    </div>

                </form>
            </div>
        </div>
    </section>
</template>
  



<script>
import { searchAddressByDistrict } from 'thai-address-database'
import anime from 'animejs/lib/anime.es.js';

export default {
    name: 'app',
    data() {
        return {
            form_data: {
                count: null,
                size: null,
                name: null,
                address_name: null,
                address_more: null,
                phone_number: null
            },
            address: [],
            selected: null,
            q: '',
        }
    },
    async mounted() {
        anime({
            targets: ".fade-anime",
            keyframes: [
                {
                    translateX: 300,
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

        try {
            let response = await this.$axios.get("/api/user/getnumber")
            this.form_data.phone_number = response.data.phone_number
        } catch (error) { } finally { }
    },
    methods: {
        async order_func() {
            const loadingComponent = this.$buefy.loading.open({ container: null })
            try {
                const response = await this.$axios.post("/api/user/order", { ...this.form_data })
                this.clear_form(this.form_data);
                this.$buefy.notification.open({
                    duration: 2000,
                    message: `${response?.data?.message} กำลังนำคุณไปหน้าชำระเงิน`,
                    type: 'is-success',
                    hasIcon: true,
                    closable: false,
                    queue: true,
                    progressBar: true,
                    autoClose: true
                })
                setTimeout(() => {
                    this.$router.push(`/store/order/${response?.data?.id}`)
                }, 2000);
            } catch (err) {
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${err?.response?.data?.message || err}`,
                    type: 'is-danger',
                    hasIcon: true,
                    closable: false,
                    queue: true,
                })
            } finally {
                await loadingComponent.close();
            }
        },
        clear_form(form) {
            Object.keys(form).forEach(function (key, index) {
                form[key] = null;
            });
        }

    },
    computed: {
        result() {
            let result = searchAddressByDistrict(this.form_data.address_name || '')
            return result.map(data => {
                return `${data.zipcode} ${data.province} ${data.amphoe} ${data.district}`
            })
        }
    }
}
</script>