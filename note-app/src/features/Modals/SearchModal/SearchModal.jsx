import "../SearchModal/SearchModal.css";
import SearchField from "../../../SearchField/SearchField";
import { NAVIGATE } from "../../../../app/PredefinedValues";
import { NOTE, TEMPLATE } from "../../../../app/PredefinedValues";

const SearchModal = () => {
  return (
    <>
      <div className="modal-content">
        <h1 className="modal-header">Search</h1>
        <SearchField searchAction={NAVIGATE} searchObjects={[NOTE, TEMPLATE]} />
      </div>
    </>
  );
};

export default SearchModal;
