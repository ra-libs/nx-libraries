import simpleRestProvider from 'ra-data-simple-rest';
import {
  CreateParams,
  CreateResult,
  DataProvider as RaDataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  fetchUtils,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';

export class DataProvider implements RaDataProvider {
  private provider: RaDataProvider;
  private httpClient;
  private URL: string;

  constructor(URL: string, options: fetchUtils.Options = {}) {
    this.URL = URL;
    this.httpClient = (url: string, clientOptions: fetchUtils.Options = {}) => {
      if (!clientOptions.headers) {
        clientOptions.headers = new Headers({ Accept: 'application/json' });
      }
      (clientOptions.headers as any).set('react-admin-agent', true);
      return fetchUtils.fetchJson(url, { ...clientOptions, ...options });
    };

    this.provider = simpleRestProvider(URL, this.httpClient);
  }

  getList<RecordType extends RaRecord = any>(
    resource: string,
    params: GetListParams,
  ): Promise<GetListResult<RecordType>> {
    return this.provider.getList(resource, params);
  }

  getOne<RecordType extends RaRecord = any>(
    resource: string,
    params: GetOneParams<any>,
  ): Promise<GetOneResult<RecordType>> {
    return this.provider.getOne(resource, params);
  }

  getMany<RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams,
  ): Promise<GetManyResult<RecordType>> {
    return this.provider.getMany(resource, params);
  }

  getManyReference<RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams,
  ): Promise<GetManyReferenceResult<RecordType>> {
    return this.provider.getManyReference(resource, params);
  }

  private hasAnyFile(data: any) {
    return (
      data &&
      Object.values(data).some((value: any) => {
        if (Array.isArray(value) && value[0]?.rawFile instanceof File)
          return true;
        return typeof value === 'object' && value?.rawFile instanceof File;
      })
    );
  }

  private createOrUpdateFormData(
    resource: string,
    params: any,
    method = 'POST',
  ) {
    const formData = new FormData();
    console.log('data : ', params?.data);
    Object.entries(params?.data).forEach(([key, value]: [string, any]) => {
      if (Array.isArray(value)) {
        value.forEach((item: any) => {
          if (item.rawFile instanceof File) {
            formData.append(`${key}[]`, item.rawFile);
          } else {
            formData.append(`${key}[]`, item);
          }
        });
      } else if (typeof value === 'object' && value?.rawFile instanceof File) {
        formData.append(key, value.rawFile);
      } else {
        formData.append(key, value);
      }
    });

    let url = `${this.URL}/${resource}`;
    if (method === 'PUT') {
      url += `/${params.id}`;
    }

    return this.httpClient(url, {
      method: method,
      body: formData,
    }).then(({ json }) => ({
      data: json,
    }));
  }

  update<RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateParams<any>,
  ): Promise<UpdateResult<RecordType>> {
    if (this.hasAnyFile(params.data)) {
      return this.createOrUpdateFormData(resource, params, 'PUT');
    }
    return this.provider.update(resource, params);
  }

  updateMany<RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams<any>,
  ): Promise<UpdateManyResult<RecordType>> {
    return this.provider.updateMany(resource, params);
  }

  create<RecordType extends RaRecord = any>(
    resource: string,
    params: CreateParams<any>,
  ): Promise<CreateResult<RecordType>> {
    if (this.hasAnyFile(params.data)) {
      return this.createOrUpdateFormData(resource, params, 'POST');
    }
    return this.provider.create(resource, params);
  }

  delete<RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    return this.provider.delete(resource, params);
  }

  deleteMany<RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    return this.provider.deleteMany(resource, params);
  }
}
