// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IOffer extends Record<string, any> {
  cep: string;
  type: 1 | 2 | 3;
  price: number;
  gameName: string;
  userEmail: string;
  plataform: string;
  condition: 1 | 2 | 3;
  description: string;
  pictures: File[];
}

export default class OfferBuilder {
  private offer: IOffer;

  constructor() {
    this.offer = {
      cep: '',
      type: 1,
      price: 0,
      gameName: '',
      userEmail: '',
      plataform: '',
      condition: 1,
      description: '',
      pictures: [],
    };
  }

  getProduct() {
    return this.offer;
  }

  addPhoto(img: File) {
    this.offer.pictures.push(img);
  }

  removePhoto(imgIdx: number) {
    if (this.offer.pictures.length > 0) this.offer.pictures.splice(imgIdx, 1);
  }

  changeOffer(attrs: Partial<IOffer>) {
    this.offer = {
      ...this.offer,
      ...attrs,
    };
  }

  getOfferAttr(key: string) {
    return this.offer[key];
  }
}
