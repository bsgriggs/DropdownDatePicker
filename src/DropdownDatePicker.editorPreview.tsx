import { ReactElement, createElement } from "react";
import { DropdownDatePickerPreviewProps } from "../typings/DropdownDatePickerProps";
import DayDropdown from "./components/dayDropdown";
import MonthDropdown from "./components/monthDropdown";
import YearDropdown from "./components/yearDropdown";

export function preview(props: DropdownDatePickerPreviewProps): ReactElement {
    type DropdownDatePickerContainerState = {
        month: number;
        day: number;
        year: number;
    };

    type dropdown = {
        sort: number;
        element: ReactElement;
    };

    const currentDateTime = new Date();
    const dropdownState: DropdownDatePickerContainerState = {
        month: currentDateTime.getMonth(),
        day: currentDateTime.getDate(),
        year: currentDateTime.getFullYear()
    };

    // sort the order of the dropdowns based on the sort widget settings
    const sortDropdowns = (): dropdown[] => {
        const dropdowns: dropdown[] = [];

        if (props.useMonth) {
            dropdowns.push({
                sort: parseFloat(props.monthSort),
                element: (
                    <MonthDropdown
                        month={dropdownState.month}
                        monthType={props.monthType}
                        monthLabel={props.monthLabel}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        setMonth={() => {}}
                        disabled={props.readOnly}
                    />
                )
            });
        }
        if (props.useDay) {
            dropdowns.push({
                sort: parseFloat(props.daySort),
                element: (
                    <DayDropdown
                        dayLabel={props.dayLabel}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        setDay={() => {}}
                        dayType={props.dayType}
                        month={dropdownState.month}
                        day={dropdownState.day}
                        year={dropdownState.year}
                        disabled={props.readOnly}
                    />
                )
            });
        }
        if (props.useYear) {
            dropdowns.push({
                sort: parseFloat(props.yearSort),
                element: (
                    <YearDropdown
                        year={dropdownState.year}
                        minYear={parseFloat(props.minYear)}
                        maxYear={parseFloat(props.maxYear)}
                        sortYearsAsc={props.sortYearsAsc}
                        yearLabel={props.yearLabel}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        setYear={() => {}}
                        disabled={props.readOnly}
                    />
                )
            });
        }
        return dropdowns;
    };

    return (
        <div className="widget-dropdowndatepicker">
            <div className="dropdowns">
                {sortDropdowns()
                    .sort((a, b) => a.sort - b.sort)
                    .map(dropdown => {
                        return dropdown.element;
                    })}
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/DropdownDatePicker.css");
}
