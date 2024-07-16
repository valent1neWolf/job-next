import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommonForm({
  action,
  buttonText,
  isBtnDisabled,
  formControls,
  btnType,
  formData,
  setFormData,
  handleFileChange,
}) {
  function renderItemByComponentType(getCurentControl) {
    let content = null;
    // console.log("current control", getCurentControl);
    switch (getCurentControl.componentType) {
      case "input":
        content = (
          <div
            className="relative flex items-center mt-8"
            key={getCurentControl.name}
          >
            <Input
              type="text"
              id={getCurentControl.name}
              name={getCurentControl.name}
              placeholder={getCurentControl.placeholder}
              value={formData[getCurentControl.name]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getCurentControl.name]: e.target.value,
                })
              }
              readOnly={getCurentControl?.readOnly}
              className="w-full h-[60px] px-4 border outline-none bg-gray-100 rounded text-lg drop-shadow-sm duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent focus:shadow-md focus:bg-white"
            />
          </div>
        );
        break;

      case "file":
        content = (
          <Label
            key={getCurentControl.name}
            htmlFor={getCurentControl.name}
            className="flex bg-gray-100 items-center p-3 mx-auto mt-6 text-lg text-center border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getCurentControl.label}</h2>
            <Input
              onChange={handleFileChange}
              id={getCurentControl.name}
              type="file"
              className="ml-3"
            />
          </Label>
        );
        break;

      case "textarea":
        content = (
          <div
            className="relative flex items-center mt-8"
            key={getCurentControl.name}
          >
            <Textarea
              type="text"
              id={getCurentControl.name}
              name={getCurentControl.name}
              placeholder={getCurentControl.placeholder}
              value={formData[getCurentControl.name]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getCurentControl.name]: e.target.value,
                })
              }
              className="w-full h-32 px-4 py-2 bg-gray-100 rounded outline-none text-lg drop-shadow-sm duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent focus:bg-white focus:shadow-md"
            />
          </div>
        );
        break;
      case "select":
        content = (
          <div
            className="relative flex items-center mt-8"
            key={getCurentControl.name}
          >
            <Select
              id={getCurentControl.name}
              name={getCurentControl.name}
              placeholder={getCurentControl.placeholder}
              value={formData[getCurentControl.name]}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  [getCurentControl.name]: value,
                })
              }
            >
              <SelectTrigger className="w-full h-12 px-4 py-2 bg-gray-100 rounded outline-none text-lg drop-shadow-sm duration-200 ease-in-out focus:outline-none  focus:border-transparent focus:bg-white ">
                <SelectValue placeholder={getCurentControl.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {getCurentControl.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
        break;
      default:
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              id={getCurentControl.name}
              name={getCurentControl.name}
              placeholder={getCurentControl.placeholder}
              value={formData[getCurentControl.name]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getCurentControl.name]: e.target.value,
                })
              }
              className="w-full h-[60px] px-4 border outline-none bg-gray-100 rounded text-lg drop-shadow-sm duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent"
            />
          </div>
        );
        break;
    }
    return content;
  }
  return (
    <form action={action}>
      {formControls.map((control) => renderItemByComponentType(control))}
      <div className="mt-6 w-full">
        <Button
          disabled={isBtnDisabled}
          type={btnType || "submit"}
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
