import { CRUDService } from "./crud-service";
import { PhraseModel } from "../models/phrase-model";
import { AppError } from "../common/app-error";

interface Phrases {
  [key: string]: PhraseModel;
}

class PhraseService extends CRUDService<Phrases> {
  private counter = 0;
  private phrases: {[key: string]: Phrases} = {};

  async create(data: any): Promise<Phrases> {
    let model = new PhraseModel(data.author, data.content, data.key);
    model.id = ++this.counter;

    if (!this.phrases[model.key]) {
      this.phrases[model.key] = {};
    }

    this.phrases[model.key][model.id] = model;

    return this.phrases[model.key];
  }  
  
  async read(id?: string): Promise<Phrases> {
    return this.phrases[id];
  }

  async readByUserId(id: string): Promise<PhraseModel[]> {
    let res = [];
    let data = this.phrases;
    for (let key in data) {
      for (let extraKey in data[key]) {
        let phrase = data[key][extraKey];
        if (phrase.author == id) {
          res.push(phrase);
        }
      }
    }

    return res;
  }

  async update(id: string, data: PhraseModel) {
    if (!this.phrases[id] || !this.phrases[id][data.id]) {
      throw new AppError(404, `Key ${id} not found in phrases`);
    }

    this.phrases[data.key][data.id] = data;
  }

  async delete(id: string, extraId: string) {
    if (!this.phrases[id] && !this.phrases[id][extraId]) {
      throw new AppError(404, `Phrase with keys ${id}, ${extraId} not found`);
    }

    delete this.phrases[id][extraId];
  }

  public init(key: string) {
    this.phrases[key] = {};
  }

}

export const phraseService = new PhraseService();
