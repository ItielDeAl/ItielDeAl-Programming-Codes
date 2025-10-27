class Dnode {
  constructor(value) {
    (this.value = value), (this.next = null);
    this.prev = null;
  }
}

module.exports = Dnode;
