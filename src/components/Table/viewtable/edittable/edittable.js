import React , {Component} from 'react'; 
import ReactDataGrid from 'react-data-grid';
import styles from './styles.css';
import {connect} from 'react-redux';
import { Link} from 'react-router';
//helper to generate a random date
var EditTable = React.createClass({

  getInitialState: function(){

    return { selectedIndexes: []};
  },
  newSavedTable(){
    swal("Good job!", "Saved your work!", "success")
    this.props.onSave(this.state.selectedIndexes,this.props.data);
  }
  ,
  rowGetter: function(i) {
    return this.props.data.tableRows[i];
  },
  onRowsSelected: function(rows) {
    console.log(rows)
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  },
  onRowsDeselected: function(rows) {
    var rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  },
  render: function() {
    var rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
    return  (
      <div>
        
        <ReactDataGrid
          rowKey='id'
          columns={this.props.data.tableHeader}
          rowGetter={this.rowGetter}
          rowsCount={this.props.data.tableRows.length}
          
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: false,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }} />
          <br />
          <br />
          <br />
          <span className={styles.selectedText}>{this.state.selectedIndexes.length} {rowText} selected</span>
          <button type="submit" className="btn btn-primary" onClick={this.newSavedTable}>Save</button>
          <button type="submit" className="btn btn-primary" ><Link to="/table/view">Back</Link></button>
          
      </div>);
  }
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTable: ()=>dispatch(createAction(FETCH_TABLES)() ),
    dispatch,
  }
}
function mapStateToProps(state){

  return { table : state.table}
}

export default connect(mapStateToProps,mapDispatchToProps)(EditTable);

