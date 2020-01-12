<template>
  <div>
    <Back />

    <div class="rank-container">
      <div class="table-container">
        <h1>Rankings</h1>
        <hr />
        <div class="rank-nav">
          <a v-if="before" :href="before">
            <img src="/icons/left.svg" class="icon" />
          </a>

          <h3>{{rank}}</h3>

          <a v-if="after" :href="after">
            <img src="/icons/right.svg" class="icon" />
          </a>
        </div>

        <table v-if="players[0]" class="table">
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>League</th>
            <th>Points</th>
          </thead>
          <tbody>
            <tr v-for="(player, index) in players" :key="player.id">
              <td>{{index + 1}}</td>
              <td>{{player.name}}</td>
              <td>{{player.league}}</td>
              <td>{{player.points}}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="!players[0]" class="no-data">No players found...</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Back from "./layout/Back.vue";

export default {
  name: "rank",
  components: {
    Back
  },
  data() {
    return {
      players: null,
      rank: null,
      before: null,
      next: null
    };
  },
  created: function() {
    axios
      .get("http://localhost:8000/api/ranking/" + this.$route.params.rank)
      .then(res => {
        this.players = res.data;
      });

    this.rank = this.$route.params.rank;

    switch (this.rank) {
      case "unranked":
        this.before = "/ranks";
        this.after = "/ranks/bronze";
        break;
      case "bronze":
        this.before = "/ranks/unranked";
        this.after = "/ranks/silver";
        break;
      case "silver":
        this.before = "/ranks/bronze";
        this.after = "/ranks/gold";
        break;
      case "gold":
        this.before = "/ranks/silver";
        this.after = "/ranks/diamond";
        break;
      default:
        this.before = "/ranks/gold";
        break;
    }
  },
  beforeRouteUpdate(to, from, next) {
    next();
  }
};
</script>

<style scoped>
.rank-container {
  display: block;
  height: 100vh;
  background-image: url("/rank-background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.table-container {
  background-color: rgba(255, 255, 255, 0.034);
  padding: 2% 3%;
  border-radius: 10px;
  color: white;
  text-align: center;
  overflow-x: auto;
}

.rank-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3%;
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

.icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
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

tr:hover {
  background-color: black;
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