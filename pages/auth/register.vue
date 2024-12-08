<template>
    <section>
        <div class="flex flex-col items-center justify-center mt-0 px-6 py-6 mx-auto h-screen lg:py-0">
            <div class="bg-white h-auto w-96 p-4 rounded-xl shadow-orange-300 shadow-2xl fade-in-ani">
                <h1 class="title is-4 has-text-centered">
                    <b-icon icon="account-plus" size="is-small">
                    </b-icon> ลงทะเบียน
                </h1>
                <form name="register" @submit.prevent="register_func">
                    <b-field>
                        <b-input v-model="register.email" name="email" autocomplete="email" placeholder="อีเมล" type="email"
                            icon="email" required>
                        </b-input>
                    </b-field>

                    <b-field class="flex flex-col items-center justify-center">
                        <b-radio v-model="register.type" name="type" native-value="new" size="is-medium" required>
                            <b-icon icon="account"></b-icon> นักศึกษาปัจจุบัน
                        </b-radio>
                        <b-radio v-model="register.type" name="type" native-value="old" size="is-medium" required>
                            <b-icon icon="school"></b-icon> ศิษย์เก่า
                        </b-radio>
                    </b-field>

                    <b-field>
                        <b-input v-model="register.phone_number" name="tel" autocomplete="tel" placeholder="เบอร์โทรศัพท์"
                            icon="phone" type="tel" required>
                        </b-input>
                    </b-field>

                    <b-field>
                        <b-input v-model="register.password" name="current-password" autocomplete="current-password"
                            placeholder="รหัสผ่าน" icon="key" type="password" minlength="8" maxlength="32" password-reveal
                            :has-counter="false" required @input="check_pass">
                        </b-input>
                    </b-field>

                    <b-field class="mb-1">
                        <b-input v-model="register.confirm_password" placeholder="ยืนยันรหัสผ่าน" icon="key" type="password"
                            minlength="8" maxlength="32" password-reveal :has-counter="false" required @input="check_pass">
                        </b-input>
                    </b-field>

                    <div v-show="this.password_miss_match">
                        <p class="text-red-400">* รหัสผ่านที่ยืนยันไม่ตรงกัน</p>
                    </div>

                    <div class="mt-3 buttons">
                        <b-button native-type="submit" type="is-primary" :disabled="this.password_miss_match"
                            expanded>ลงทะเบียน</b-button>
                    </div>

                </form>
                <hr class="mt-3 mb-3">
                <p class="has-text-centered">
                    ลงทะเบียนไปแล้ว <NuxtLink to="/auth/login">เข้าสู่ระบบ</NuxtLink><br>
                    <NuxtLink to="/">หน้าแรก</NuxtLink>
                </p>

            </div>
        </div>
    </section>
</template>
<script>
import anime from 'animejs/lib/anime.es.js';
export default {
    auth: 'guest',
    head() {
        return {
            title: "ลงทะเบียน - EE XVII HOMECOMING",
        }
    },
    data() {
        return {
            register: {
                email: null,
                phone_number: null,
                type: null,
                password: null,
                confirm_password: null
            },
            password_miss_match: false
        }
    },
    mounted() {
        anime({
            targets: ".fade-in-ani",
            keyframes: [
                {
                    translateY: 300,
                    duration: 0,
                    opacity: 0
                },
                {
                    translateY: 0,
                    opacity: 1,
                    duration: 800,
                    delay: 100,
                },
            ],
            duration: 0,
        });
    },
    methods: {
        // goto_login() {
        //     const router = this.$router;
        //     anime({
        //         targets: ".rotateing",
        //         rotateX: [{ value: "180deg", duration: 1000 }, { value: "0deg", duration: 0, delay: 0 }],
        //         duration: 0,
        //         begin: function () {
        //             router.push("/auth/login");
        //         }
        //     });
        // },
        check_pass() {
            if (this.register.password != this.register.confirm_password) {
                this.password_miss_match = true
            } else {
                this.password_miss_match = false
            }
        },
        async register_func() {
            // console.log(this.register)
            const loadingComponent = this.$buefy.loading.open({ container: null })
            try {
                const response = await this.$axios.post("/api/auth/register", { ...this.register })
                this.clear_form(this.register);
                this.$buefy.notification.open({
                    duration: 2000,
                    message: `${response?.data?.message} กำลังนำคุณไปหน้าเข้าสู่ระบบ `,
                    type: 'is-success',
                    hasIcon: true,
                    closable: false,
                    queue: true,
                    progressBar: true,
                    autoClose: true
                })
                setTimeout(() => {
                    this.$router.push("/auth/login")
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
    }
}
</script>