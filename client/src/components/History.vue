<template>
  <div>
    <Back />
    <div class="rank-container">
      <div class="table-container">
        <h1>Game history</h1>
        <hr />

        <table class="table">
          <thead>
            <th>#</th>
            <th>Adversary</th>
            <th>Result</th>
          </thead>
          <tbody>
            <tr v-for="(room, index) in rooms" :key="room._id">
              <td>{{index + 1}}</td>
              <td>{{user._id == room.player1 ? room.player2 : room.player1}}</td>
              <td>{{user._id == room.winner ? "winner" : "loser"}}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="!rooms[0]" class="no-data">No rooms found...</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Back from "./layout/Back.vue";

export default {
  name: "ranks",
  components: {
    Back
  },
  data() {
    return {
      rooms: null,
      user: null
    };
  },
  created: function() {
    axios
      .get("http://localhost:8000/api/room/history", {
        headers: { "x-access-token": localStorage.token }
      })
      .then(res => {
        this.rooms = res.data;
      });
    axios
      .get("http://localhost:8000/api/user/current", {
        headers: { "x-access-token": localStorage.token }
      })
      .then(res => {
        this.user = res.data;
      });
  }
};
</script>

<style scoped>
.rank-container {
  display: block;
  height: 100vh;
  background-image: url("/history-background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.table-container {
  background-color: rgba(0, 0, 0, 0.746);
  padding: 2% 3%;
  border-radius: 10px;
  color: white;
  text-align: center;
  overflow-x: auto;
}
.no-data {
  height: 400px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align: center;
}

h3 {
  margin: auto 50px;
}

.table {
  border-collapse: collapse;
}

tbody {
  margin-top: 5%;
}

td {
  padding: 15px 80px;
}

@media only screen and (max-width: 1000px) {
  td {
    padding: 10px 40px;
  }
  .no-data {
    height: 200px;
    width: 300px;
  }
}

@media only screen and (max-width: 767px) {
  td {
    padding: 8px;
  }

  .no-data {
    height: 100px;
    width: 250px;
  }
}
</style>