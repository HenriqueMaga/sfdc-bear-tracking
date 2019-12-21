import { LightningElement, track, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
import { loadStyle } from 'lightning/platformResourceLoader';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';
export default class BearList extends LightningElement {
	@track searchTerm = '';
	@wire(searchBears, {searchTerm: '$searchTerm'})
	bears;
	
	connectedCallback() {
		loadStyle(this, ursusResources + '/style.css');
	}
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
			console.log('Bears length: '+this.bears.data.length);
		}, 300);
	}/*
	get hasResults() {
		return this.bears.data.length > 0;
	}*/
}