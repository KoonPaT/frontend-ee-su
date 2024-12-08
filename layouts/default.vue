<template>
  <section>
    <nav>
      <b-navbar transparent shadow :mobile-burger="true"
        v-if="!['/', '/auth/login/', '/auth/register/', '/auth/login', '/auth/register'].includes($nuxt.$route.path)">
        <template #brand>
          <b-navbar-item tag="router-link" to="/">
            <img width="28px" height="28px" src="/icon.png" alt="Website logo" />
          </b-navbar-item>

          <!-- <div> -->
          <!-- <b-navbar-item tag="div" class="hideonpc"> -->
          <!-- <div class="buttons"> -->
          <!-- <b-button type="is-dark" @click="$router.push('/store/ticket')" class="button">
                    <i class="bi bi-ui-radios-grid"></i> จองโต๊ะ
                  </b-button>
                  <b-button type="is-dark" @click="$router.push('/store/shirt')" class="button">
                    <i class="bi bi-cart2"></i> ซื้อเสื้อ
                  </b-button> -->

          <!-- <b-button type="is-danger" @click="logout()" class="button">
                    <i class="bi bi-box-arrow-right"></i> ล็อกเอาท์
                  </b-button> -->
          <!-- </div> -->
          <!-- </b-navbar-item> -->
          <!-- </div> -->

        </template>

        <template #end>
          <div>
            <b-navbar-item tag="div">
              <!-- <div class="buttons">
                  <b-button type="is-dark" @click="$router.push('/store/ticket')" class="button">
                    <i class="bi bi-ui-radios-grid"></i> จองโต๊ะ
                  </b-button>
                  <b-button type="is-dark" @click="$router.push('/store/shirt')" class="button">
                    <i class="bi bi-cart2"></i> ซื้อเสื้อ
                  </b-button>
                </div> -->
              <b-navbar-item tag="div">
                <NuxtLink to="/" :class="`${$nuxt.$route.path == '/' ? 'is-active' : 'text-slate-800'}`">
                  <i class="bi bi-house"></i> หน้าแรก
                </NuxtLink>

              </b-navbar-item>
              <b-navbar-item tag="div">
                <!-- <i class="bi bi-shop"></i>ร้านค้า -->
                <NuxtLink to="/store" :class="`${$nuxt.$route.path == '/store' ? 'is-active' : 'text-slate-800'}`">
                  <i class="bi bi-shop"></i> ร้านค้า
                </NuxtLink>
              </b-navbar-item>
              <b-navbar-item tag="div">
                <!-- <i class="bi bi-ui-radios-grid"></i> จองโต๊ะ -->
                <NuxtLink to="/store/ticket"
                  :class="`${$nuxt.$route.path == '/store/ticket' ? 'is-active' : 'text-slate-800'}`">
                  <i class="bi bi-ui-radios-grid"></i> จองโต๊ะ
                </NuxtLink>
              </b-navbar-item>
              <b-navbar-item tag="div">
                <!-- <i class="bi bi-cart2"></i> ซื้อเสื้อ -->
                <NuxtLink to="/store/shirt"
                  :class="`${$nuxt.$route.path == '/store/shirt' ? 'is-active' : 'text-slate-800'}`">
                  <i class="bi bi-gift"></i> ซื้อเสื้อ
                </NuxtLink>
              </b-navbar-item>
              <b-navbar-item tag="div">
                <!-- <i class="bi bi-cart2"></i> ซื้อเสื้อ -->
                <NuxtLink to="/history/ticket"
                  :class="`${$nuxt.$route.path == '/history/ticket' ? 'is-active' : 'text-slate-800'}`">
                  <i class="bi bi-receipt"></i> ประวัติการจองโต๊ะ
                </NuxtLink>
              </b-navbar-item>
              <b-navbar-item tag="div">
                <!-- <i class="bi bi-cart2"></i> ซื้อเสื้อ -->
                <NuxtLink to="/history/shirt"
                  :class="`${$nuxt.$route.path == '/history/shirt' ? 'is-active' : 'text-slate-800'}`">
                  <i class="bi bi-receipt"></i> ประวัติการสั่งเสื้อ
                </NuxtLink>
              </b-navbar-item>
              <b-navbar-item tag="div" class="buttons">
                <b-button type="is-danger" @click="logout()" expanded>
                  <i class="bi bi-box-arrow-right"></i> ออกจากระบบ
                </b-button>
                <!-- <i class="bi bi-box-arrow-right"></i> ล็อกเอาท์ -->
              </b-navbar-item>
            </b-navbar-item>
          </div>
        </template>
      </b-navbar>
    </nav>

    <main>
      <Nuxt />
    </main>
  </section>
</template>

<script>
export default {
  name: "DefaultLayout",
  methods: {
    async logout() {
      // this.$store.commit("lockbtn", true);
      const loadingComponent = this.$buefy.loading.open({ container: null })
      try {
        await this.$auth.logout();
        this.$buefy.toast.open({
          duration: 5000,
          message: `ล็อกเอาท์สำเร็จ`,
          type: "is-success",
        });
        this.$router.push('/');
      } finally {
        loadingComponent.close()
      }
    },
  },
  async mounted() {
    // if (this.$auth.loggedIn) {
    //   try {
    //     var { data } = await this.$axios.get("/api/user/balance", {
    //       progress: false,
    //     });
    //     this.$store.commit("set", data.balance);
    //   } catch (err) { }
    // }
    // var olf = false;
    // setInterval(() => {
    //   if (olf) {
    //     return
    //   } else {
    //     if (this.$nuxt.isOffline) {
    //       olf = true;
    //       this.$store.commit("lockbtn", true);
    //       this.$buefy.toast.open({
    //         duration: 30000,
    //         message: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wifi-off" viewBox="0 0 16 16"><path d="M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z"></path></svg> กรุณาเชื่อมต่ออินเทอร์เน็ต`,
    //         type: "is-danger",
    //       });
    //       var clearinterval = setInterval(() => {
    //         if (this.$nuxt.isOnline) {
    //           this.$buefy.toast.open({
    //             duration: 30000,
    //             message: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wifi" viewBox="0 0 16 16"><path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z"></path><path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z"></path></svg> การเชื่อมต่ออินเทอร์เน็ตปกติ`,
    //             type: "is-success",
    //           });
    //           olf = false;
    //           this.$store.commit("lockbtn", false);
    //           clearInterval(clearinterval);
    //         }
    //       }, 1000);
    //     }
    //   }
    // }, 1000);
  },
};
</script>
<style>
html,

#footer {
  margin-top: auto;
  bottom: 0;
  width: 100%;
  height: 40px;
  position: relative;
}

@media (min-width: 768px) {
  .hideonpc {
    display: none;
  }
}

@media (max-width: 1024px) {
  .hideonpc {
    display: block;
  }
}
</style>
