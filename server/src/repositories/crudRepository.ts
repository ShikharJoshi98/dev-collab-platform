class CrudRepository<T>{
    model:any

    constructor(model:any) {
        this.model = model;
    }

    async create(data: T):Promise<T> {
        const response = await this.model.create(data);
        return response;
    }

    async fetchAll():Promise<T[]> {
        const response = await this.model.find();
        return response;
    }

    async fetchById(id:string): Promise<T | null> {
        const response = await this.model.findById(id);
        return response;
    }

    async update(id:string, data: Partial<T>): Promise<T | null> {
        const response = await this.model.findByIdAndUpdate(id, data);
        return response;
    }

    async destroy(id:string): Promise<T | null> {
        const response = await this.model.findByIdAndDelete(id);
        return response;
    }

}

export default CrudRepository;