import PageContext from "../store/page-context";
import {render} from "@testing-library/react";

const customRender = (ui, {providerProps}) => {
    return render(
        <PageContext.Provider value={providerProps}>{ui}</PageContext.Provider>
    )
}

export default customRender;