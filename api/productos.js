class Contenedor {
  constructor(nombre){
    this.nombre = `./${nombre}.txt`;
    this.items = [];
  }
  async open(){
    try {
      if (fs.existsSync(this.nombre)) {
        this.items = JSON.parse(fs.readFileSync(this.nombre,'utf-8'));
      } else {
        fs.writeFileSync(this.nombre,JSON.stringify([]),'utf-8');
      }
    } catch (error) {}
  }
  async save(producto){
    try {
      this.items.push({id:this.length, title:producto.title, price:producto.price, id: (this.items.length + 1),thumbnail: producto.img});
      await fs.promises.writeFile(this.nombre,JSON.stringify(this.items,null, 2));
      return this.items.length;
      }
      catch(error) {
        console.log(error.message);
      }
  }
  async getById(id){
    try {
      const info = await this.getAll()
      const obj = (info != undefined) ? info.find(o => o.id == id) : [];
      console.log(obj);
      return obj;
    } catch (error) {
      console.log(error)
    }
  }

  async getAll(){
    try {
      if (fs.existsSync(this.nombre)) {
        const datos = await fs.promises.readFile(this.nombre, 'utf-8')
        return JSON.parse(datos);
      }
      
      return undefined
    } catch (error) {
      console.log('error');
    }
  }

  async deleteById(id){
    try {
      const info = await this.getAll()
      const obj = (info != undefined) ? info.filter(o => o.id !== id) : info;
      console.log(obj);
      return await fs.promises.writeFile(this.nombre,JSON.stringify(obj,null, 2));
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAll(){
    await fs.promises.unlink(this.nombre)
  }
}
module.exports = {Contenedor,}