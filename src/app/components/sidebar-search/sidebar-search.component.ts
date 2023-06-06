import {
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { MENU } from 'src/app/modules/main/menu-sidebar/menu-sidebar.component';

import {PfDropdown} from '@profabric/angular-components';

@Component({
    selector: 'app-sidebar-search',
    templateUrl: './sidebar-search.component.html',
    styleUrls: ['./sidebar-search.component.scss']
})
export class SidebarSearchComponent implements OnInit {
    public searchText: string = '';
    public foundMenuItems:any = [];
    @ViewChild('dropdown') dropdown!: PfDropdown;

    constructor() {}

    ngOnInit(): void {}

    handleSearchTextChange(event:any) {
        this.foundMenuItems = [];

        if (event.target.value) {
            this.searchText = event.target.value;
            this.findMenuItems(MENU);
            return;
        } else {
            this.searchText = '';
            this.dropdown.isOpen = false;
        }
    }

    handleIconClick() {
        this.searchText = '';
        this.dropdown.isOpen = false;
    }

    handleMenuItemClick() {
        this.searchText = '';
        this.dropdown.isOpen = false;
    }

    findMenuItems(menu:any) {
        if (!this.searchText) {
            return;
        }

        menu.forEach((menuItem:any) => {
            if (
                menuItem.path &&
                menuItem.name
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())
            ) {
                this.foundMenuItems.push(menuItem);
            }
            if (menuItem.children) {
                return this.findMenuItems(menuItem.children);
            }
        });

        if (this.foundMenuItems.length > 0) {
            this.dropdown.isOpen = true;
        }
    }

    boldString(str:any, substr:any) {
        return str.replaceAll(
            this.capitalizeFirstLetter(substr),
            `<strong class="text-light">${this.capitalizeFirstLetter(
                substr
            )}</strong>`
        );
    }

    capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
