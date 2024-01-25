import { useCurrentPage } from "../../../contexts/SignupContext";
import CreateAccount from "./CreateAccount";
import VerifyAge from "./VerifyAge";
import VerifyEmail from "./VerifyEmail";

/*
 * 現在のページをコントロールする
 * pageNo = 1: Verify Age
 * pageNo = 2: Create Account
 * pageNo = 3: Verify Email
 */
const PageController = () => {
  /***** context ******/
  const currentPage = useCurrentPage();
  const pageNo = currentPage.pageNo;

  /***** HTML ******/
  return (
    <>
      {pageNo === 1 ? (
        <VerifyAge />
      ) : pageNo === 2 ? (
        <CreateAccount />
      ) : pageNo === 3 ? (
        <VerifyEmail />
      ) : (
        <div>ページが見つかりません</div>
      )}
    </>
  );
};

export default PageController;
