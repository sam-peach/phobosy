export default (function() {
  let id = 0
  return {
    new: function() {
      return ++id
    },
    set: function(n) {
      id = n
    }
  }
})()
