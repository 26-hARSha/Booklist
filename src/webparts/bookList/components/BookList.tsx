import * as React from 'react';
//import styles from './BookList.module.scss';
import { IBookListProps } from './IBookListProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'; //SPHttpClientConfiguration is declared but its value is never read.
import styles from './BookList.module.scss';
//import { divProperties } from 'office-ui-fabric-react';

//single item
interface IBookListItem {// 'IBookListItem' 
  Title: string,
  Author0: string;
  Copies: number;
  Date:any;
  Reviews:string;
  People:string;
}
//multiple items
interface IAllItems {
  // 'IAllItems' 
  AllBooks: IBookListItem[];
}
export default class BookList extends React.Component<
  IBookListProps,
  IAllItems
> {
  constructor(props: IBookListProps, state: IAllItems) {
    super(props);
    this.state = {
      AllBooks: [],
    }
  };

  componentDidMount() {
    //alert ("Componenet Did Mount Called...");
    //console.log("First Call.....");
    this, this.getAllBookDetails();
  };

 
    

  public getAllBookDetails = () => {
    console.log("This is Book Detail function");
    //api call
    let listurl = `${this.props.listUrl}/_api/lists/GetByTitle('${this.props.listName}')/items`;
    console.log(listurl);
   

    this.props.context.spHttpClient
      .get(listurl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          //console.log(responseJSON);
          this.setState({ AllBooks: responseJSON.value, })
        });
        console.log(this.state.AllBooks);
      });
  };

  public render(): React.ReactElement<IBookListProps> {
    return (
      <><><div> <h2>Book INfo</h2></div><div className={styles.container}> {this.state.AllBooks.map(book => {
        return (
          <>

            <h2>Book Name:    {book.Title}</h2>
            <h3>Author:   {book.Author0}</h3>
            <h3>Copies:   {book.Copies}</h3>
            <h3>Publish Date:   {book.Date}</h3>
            <h3>Feed Back:    {book.Reviews}</h3>
            <h3>Student:    {book.People}</h3>
            <hr />
          </>
        );
      })}

      </div></><div>
          <table>
            <tr className={styles.styles}>
              <th>Boook Name</th>
              <th>Author</th>
              <th>Copies</th>
              <th>Publish Date</th>
              <th>Feed Back</th>
              <th>Student</th>
            </tr>
            {this.state.AllBooks.map((book) =>{
              return(
                <tr>
              <th>{book.Title}</th>
              <th>{book.Author0}</th>
              <th>{book.Copies}</th>
              <th>{book.Date}</th>
              <th>{book.Reviews}</th>
              <th>{book.People}</th>
            </tr>
              )
            })
            }
          </table>
        </div></>

    );
  }
}
