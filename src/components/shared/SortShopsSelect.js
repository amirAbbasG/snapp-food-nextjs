import {useState} from "react";

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
} from "@mui/material";


import {sortTypes} from "../../utils/values";


const SortShopsSelect = ({handleChangeSort}) => {

    const [sortType, setSortType] = useState("پیش فرض");
    const [open, setOpen] = useState(false);
    const {select, icon} = styles;


    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        handleChangeSort(value.type)
        setSortType(value.title);
        setOpen(false);
    };
    return (
        <FormControl
            sx={{
                width: 200,
            }}
        >
            <InputLabel>به ترتیب</InputLabel>

            <Select
                classes={{select, icon}}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={sortType}
                onChange={handleChange}
                renderValue={() =>
                    sortType === "پیش فرض" ? <em>پیش فرض</em> : sortType
                }
                input={<OutlinedInput label="به ترتیب"/>}
            >
                <MenuItem disabled value="">
                    <em>پیش فرض</em>
                </MenuItem>
                {sortTypes.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SortShopsSelect;

const styles = {
    select: {
        display: "flex",
        justifyContent: "space-evenly",
    },
    icon: {
        borderLeft: "1px #e3e3e4 solid",
    },
};
