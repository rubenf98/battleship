<template>
  <div>
    <Back />

    <div class="room-selection-container">
      <div id="room-page-header">
        <h1>Choose your battle!</h1>
      </div>
      <div class="selection-container">
        <div class="btn-container">
          <img class="selection-btn" @click="createPublicRoom" src="/public-btn.png" alt />
        </div>
        <div class="btn-container">
          <img class="selection-btn" @click="createPrivateRoom" src="/private-btn.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Back from "./layout/Back.vue";
const { url } = require("../helper");

export default {
  name: "Room",
  components: {
    Back
  },
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    createPublicRoom() {
      const vm = this;
      axios
        .post(
          url + "/api/room ",
          {
            type: "public"
          },
          {
            headers: { "x-access-token": localStorage.token }
          }
        )
        .then(function(response) {
          vm.$router.push("/room/" + response.data._id);
        })
        .catch(function(e) {
          vm.$router.push({
            name: "menu",
            params: { feedback: e.response.data }
          });
          console.log(e.response.data);
        });
    },
    createPrivateRoom() {
      const vm = this;
      axios
        .post(
          url + "/api/room ",
          {
            type: "private"
          },
          {
            headers: { "x-access-token": localStorage.token }
          }
        )
        .then(function(response) {
          vm.$router.push("/room/" + response.data._id);
        })
        .catch(function(e) {
          vm.$router.push({
            name: "menu",
            params: { feedback: e.response.data }
          });
          console.log(e.response.data);
        });
    }
  }
};
</script>


<style scoped>
.room-selection-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url("/selection-background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
h1 {
  text-align: center;
  font-family: "Black Ops One", cursive;
  color: white;
  font-size: 100px;
  margin-bottom: 10%;
}

.selection-container {
  display: flex;
  width: 50%;
  margin: auto;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.selection-btn {
  width: 100%;
  transition: 0.3s ease;
}
.selection-btn:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.btn-container {
  width: fit-content;
  display: flex;
  justify-content: center;
  width: 35%;
  min-width: 150px;
  margin: 5% auto;
}

@media only screen and (max-width: 1000px) {
  h1 {
    margin-top: 100px;
    font-size: 70px;
  }
  .btn-container {
    width: 40%;
  }
}

@media only screen and (max-width: 767px) {
  h1 {
    font-size: 46px;
  }
  .btn-container {
    width: 60%;
  }
}
</style>


