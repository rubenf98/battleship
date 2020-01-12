<template>
  <div class="loading-container">
    <div id="progress" class="progress-bar">
      <span class="bar">
        <span class="progress"></span>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "loading",
  data() {
    return {
      room: null
    };
  },
  mounted() {
    const vm = this;
    axios
      .post("http://localhost:8000/api/room/random", "body", {
        headers: { "x-access-token": localStorage.token }
      })
      .then(function(response) {
        setTimeout(function() {
          vm.$router.push("/room/" + response.data._id);
        }, 5800);
      })
      .catch(function(e) {
        setTimeout(function() {
          vm.$router.push({
            name: "menu",
            params: { feedback: e.response.data }
          });
          console.log(e.response.data);
        }, 5800);
      });
  }
};
</script>

<style scoped>
.loading-container {
  display: block;
  height: 100vh;
  background-color: black;
}

@keyframes loader {
  0% {
    width: 0;
  }

  20% {
    width: 10%;
  }

  25% {
    width: 24%;
  }

  43% {
    width: 41%;
  }

  56% {
    width: 50%;
  }

  66% {
    width: 52%;
  }

  71% {
    width: 60%;
  }

  75% {
    width: 76%;
  }

  94% {
    width: 86%;
  }

  100% {
    width: 100%;
  }
}
.progress-bar {
  border-radius: 60px;
  overflow: hidden;
  width: 100%;
}

span {
  display: block;
}

.bar {
  background: rgba(0, 0, 0, 0.075);
}

.progress {
  animation: loader 6s ease;
  background: lightblue;
  color: #fff;
  padding: 10px;
  width: 0;
}

.progress-bar {
  left: 50%;
  max-width: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>