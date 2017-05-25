class ModelBase{

  constructor(colleccioEntrada , document){
    this.setColleccio(colleccioEntrada);
    this.setModel(document);
  }

  setColleccio(colleccio)
  {this.colleccio = colleccio;}

  getColleccio()
  {return this.colleccio;}

  setModel(model)
  {this.model = model;}

  getModel()
  {return this.model}
}

module.exports = ModelBase;
