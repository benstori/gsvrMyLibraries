import { ISPList } from './MyLibrariesWebPart';
export default class MockHttpClient {
    private static _items;
    static get(): Promise<ISPList[]>;
}
