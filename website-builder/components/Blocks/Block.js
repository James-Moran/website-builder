import ProductBlock from "./ProductBlock";
import InputBlock from "./InputBlock";
import TextBlock from "./TextBlock";

const Block = (props) => {
  const { block } = props;
  switch (block.type) {
    case "basic":
      return <ProductBlock {...props} />;
    case "ProductBlock":
      return <ProductBlock {...props} />;
    case "InputBlock":
      return <InputBlock {...props} />;
    case "TextBlock":
      return <TextBlock {...props} />;
    // case "checkout":
    //   return CheckoutBlock(block);
    default:
      return <></>;
  }
};

export default Block;
