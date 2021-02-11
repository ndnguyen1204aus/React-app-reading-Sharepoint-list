import * as React from 'react';
import styles from './CrudWithReact.module.scss';
import { ICrudWithReactProps } from './ICrudWithReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ISiteInspectionItem } from './ISiteInspectionItem';
import { ICrudWithReactState } from './ICrudWithReactState';

import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


import {
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode
} from 'office-ui-fabric-react';


  // Configure the columns for the DetailsList component
  let _listColumns = [
    {
      key: 'Id',
      name: 'ID',
      fieldName: 'Id',
      minWidth: 50,
      maxWidth: 100,
      isResizable: true
    },
    {
      key: 'Title',
      name: 'Title a',
      fieldName: 'Title',
      minWidth: 50,
      maxWidth: 100,
      isResizable: true
    },
    {
      key: 'FormtabID',
      name: 'Formtab ID',
      fieldName: 'FormtabID',
      minWidth: 50,
      maxWidth: 100,
      isResizable: true
    },
    {
      key: 'ProjectNumber',
      name: 'Project Number',
      fieldName: 'ProjectNumber',
      minWidth: 50,
      maxWidth: 100,
      isResizable: true
    },
    {
      key: 'Date',
      name: 'Submitted Date',
      fieldName: 'Date',
      minWidth: 50,
      maxWidth: 100,
      isResizable: true
    },
    {
      key: 'InspectionType',
      name: 'InspectionType',
      fieldName: 'InspectionType',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'PDFlink',
      name: 'Download',
      fieldName: 'PDFlink',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'Time',
      name: 'Submitted Time',
      fieldName: 'Time',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'Description',
      name: 'Details',
      fieldName: 'Description',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'Level',
      name: 'Audit Level',
      fieldName: 'Level',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'Zone',
      name: 'Audit Zone',
      fieldName: 'Zone',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'Submitter',
      name: 'ID Submitter',
      fieldName: 'SubmitterId',
      minWidth: 50,
      maxWidth: 150,
      isResizable: true
    }              
  ];

export default class CrudWithReact extends React.Component<ICrudWithReactProps, ICrudWithReactState> {
  constructor(props: ICrudWithReactProps, state: ICrudWithReactState) {
    super(props);

    this.state = {
      status: 'Loading items',
      SiteInspectionListItems: [],
      SiteInspectionListItem: {
        Id: 0,
        Title: '',
        FormtabID: '',
        ProjectNumber: '',
        Date: '', 
        InspectionType: '',   
        PDFlink: '',
        Time: '',
        Description: '',
        Level: '',
        Zone: '',
        Submitter:{
            id: 0,
            displayName: '',
            email: ''
        } 
      }
    };   
  }


  private _getListItems(): Promise<ISiteInspectionItem[]> {
    //const url: string = this.props.siteUrl + "/_api/lists/getbytitle('Site%20inspections')/items?";
    const url: string = "https://buildcorp.sharepoint.com/hse/_api/lists/getbytitle('Site%20inspections')/items?";
    return this.props.context.spHttpClient.get(url,SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json.value);
        return json.value;
      }) as Promise<ISiteInspectionItem[]>;
  }
  
  public componentDidMount(): void {
    this._getListItems().then(listItems => {
      if(listItems && listItems.length > 0){
        this.setState({ 
          SiteInspectionListItems: listItems,
          status: "All Records have been loaded Successfully"
        });
      } else{
        this.setState({ 
          status: "No item/Not found"
        });
      }
      
    });  
  }

  public render(): React.ReactElement<ICrudWithReactProps> {
    console.log(this.state.status);
    return (
      <div className={ styles.crudWithReact }>
        <DetailsList
              items={ this.state.SiteInspectionListItems}
              columns={ _listColumns }
              setKey='Id'
              checkboxVisibility={ CheckboxVisibility.onHover}
              selectionMode={ SelectionMode.single}
              layoutMode={ DetailsListLayoutMode.fixedColumns }
              compact={ true }                                       
          />
      </div>
    );


  }
}
