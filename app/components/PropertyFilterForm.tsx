import { Button, Form, Input } from "antd";

interface PropertyFilterFormProps {
  form: any;
}

export const PropertyFilterForm = ({ form }: PropertyFilterFormProps) => {
  const handleClose = () => {
    form.resetFields();
  };

  const handleFilterSearch = () => {
    const values = form.getFieldsValue();
    console.log("Filter Search clicked", values);
  };

  const handleCopyLink = () => {
    console.log("Copy Link clicked");
  };

  const handleResetFilter = () => {
    form.resetFields();
    console.log("Reset Filter clicked");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="propertyFilter"
    >
      <Form.Item
        label="Project"
        name="projectNameFilter"
      >
        <Input placeholder="Project Name" size="large" />
      </Form.Item>
      <Form.Item
        label="Address Unit"
        name="addressUnitFilter"
      >
        <Input placeholder="Address Unit" size="large" />
      </Form.Item>

      <Form.Item>
        <div className="flex gap-3">
          <Button
            color="default"
            size="small"
            variant="outlined"
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>
          <Button
            color="default"
            size="small"
            variant="outlined"
            onClick={handleResetFilter}
          >
            Reset Filter
          </Button>
          <Button
            color="danger"
            size="small"
            variant="outlined"
            onClick={handleFilterSearch}
          >
            Search
          </Button>
          <Button
            color="default"
            size="small"
            variant="outlined"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
