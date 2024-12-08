<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div class="box-border bg-white h-auto w-96 p-4 rounded-xl shadow-orange-300 shadow-2xl fade-in-ani">
                <h1 class="title is-4 has-text-centered">
                    <b-icon icon="account-arrow-right" size="is-small">
                    </b-icon> เข้าสู่ระบบ
                </h1>
                <form name="login" @submit.prevent="login_func" autocomplete="on">
                    <b-field>
                        <b-input v-model="login.email" placeholder="อีเมล" type="email" icon="email" name="email"
                            autocomplete="username" required>
                        </b-input>
                    </b-field>

                    <b-field>
                        <b-input v-model="login.password" placeholder="รหัสผ่าน" icon="key" type="password"
                            name="current-password" autocomplete="current-password" minlength="8" maxlength="32"
                            password-reveal :has-counter="false" required>
                        </b-input>
                    </b-field>

                    <div class="buttons">
                        <b-button native-type="submit" type="is-primary" expanded>เข้าสู่ระบบ</b-button>
                    </div>

                </form>
                <hr class="mt-3 mb-3">
                <p class="has-text-centered">
                    ยังไม่ได้ลงทะเบียน <NuxtLink to="/auth/register">ลงทะเบียน</NuxtLink><br>
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
            title: "เข้าสู่ระบบ - EE XVII HOMECOMING",
        }
    },
    data() {
        return {
            login: {
                email: null,
                password: null,
            }
        }
    },
    mounted() {
        anime({
            targets: ".fade-in-ani",
            keyframes: [
                {
                    translateY: 300,
                    duration: 0,
                    opacity: 0,
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
        // goto_register() {
        //     const router = this.$router;
        //     anime({
        //         targets: ".rotateing",
        //         rotateX: [{ value: "180deg", duration: 1000 }, { value: "0deg", duration: 0, delay: 0 }],
        //         duration: 0,
        //         begin: function () {
        //             router.push("/auth/register");
        //         }
        //     });
        // },
        async login_func() {
            const loadingComponent = this.$buefy.loading.open({ container: null })
            try {
                const response = await this.$auth.loginWith('local', { data: this.login })
                // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjU3MWQ2YmM5YTJjYWY2NzM4MGVlYjczIiwidHlwZSI6Im9sZCIsImlhdCI6MTcwMjE0ODY0MH0.7POHnNmWF_0lfWurDj64zeaU6C2TrzhM5ToxE_JqMYE");
                this.clear_form(this.login);
                this.$buefy.notification.open({
                    duration: 5000,
                    message: `${response?.data?.message}`,
                    type: 'is-success',
                    hasIcon: true,
                    closable: false,
                    queue: true,
                })
            } catch (err) {
                await this.$buefy.notification.open({
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