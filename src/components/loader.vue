<template>
  <div class="spinner">
    <h1 class="is-size-1">LOADING...</h1>
    <span class="rect1"></span>
    <span class="rect2"></span>
    <span class="rect3"></span>
    <span class="rect4"></span>
    <span class="rect5"></span>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spinner {
  margin: 0 auto;
  margin-top: 30px;
  width: auto;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.spinner > span {
  background-color: #333;
  height: 100%;
  width: 10px;
  margin: 0 3px;
  display: inline-block;
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>