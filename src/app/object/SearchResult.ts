
export class SearchResult<T> {
  public count: number = 0;
  public result: T[] = [];
  public searchTxt: string = '';
  public isResetFilter: boolean = false;
  public isResetPage: boolean = false;
}
