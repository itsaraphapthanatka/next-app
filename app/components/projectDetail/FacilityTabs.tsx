import { Form, Checkbox, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getFacilitiesById } from "@/app/server_actions/project";
import { getFacilities } from "@/app/server_actions/master";

type SelectedProject = {
  id?: number;
  projectId?: number;
};

type Facility = {
  id: number;
  name: string;
  icon?: string;
  facilityType?: string;
  forProject?: boolean;
  forProperty?: boolean;
};

type ProjectFacility = {
  id: number;
  name: string;
  icon?: string;
};

export const FacilityTabs = ({
  token,
  selectedProject,
}: {
  token: string;
  selectedProject: SelectedProject;
  modalType: string;
}) => {
  const [form] = Form.useForm();

  const [allFacilities, setAllFacilities] = useState<Facility[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token || !selectedProject?.id) return;

    let mounted = true;
    setLoading(true);
    // reset ชั่วคราวเวลาสลับโปรเจกต์
    setAllFacilities([]);
    setSelectedIds([]);
    form.resetFields(["facilities"]);

    Promise.all([
      getFacilities(token), // [{id,name}] ไม่มี icon
      getFacilitiesById(selectedProject.id as number, token), // Facility[] ของโปรเจกต์ (มี icon)
    ])
      .then(([allRes, projectRes]) => {
        if (!mounted) return;

        // 1) normalize project facilities แล้วทำ map ของ icon เพื่อไปเติมให้ all
        const projFacilities: Facility[] = (projectRes || []).map((f: ProjectFacility) => {
          const id = typeof f === "number" ? f : Number(f?.id);
          const name =
            typeof f === "number" ? "" : (f?.name ? String(f.name) : "");
          const icon =
            typeof f === "number"
              ? undefined
              : (f?.icon ? String(f.icon) : undefined);
          return { id, name, icon };
        });

        const iconById = new Map<number, string>();
        for (const f of projFacilities) {
          if (f.icon) iconById.set(f.id, f.icon);
        }

        // 2) normalize all facilities แล้วเติม icon จาก iconById (ถ้ามี)
        const all: Facility[] = (allRes || []).map((f: ProjectFacility) => {
          const id = Number(f?.id);
          const name = String(f?.name ?? "");
          const icon = iconById.get(id); // เติมจากโปรเจกต์ถ้ามี
          return { id, name, icon };
        });

        setAllFacilities(all);

        // 3) set selections
        const ids = projFacilities.map((f) => f.id);
        setSelectedIds(ids);
        form.setFieldsValue({ facilities: ids });
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [token, selectedProject?.id]);

  const handleChange = (vals: number[]) => {
    setSelectedIds(vals);
    form.setFieldsValue({ facilities: vals });
  };

  return (
    <Form form={form} layout="vertical" name="tabsFacilityDetail">
      <Row>
        <Col span={24}>
          <Form.Item name="facilities">
            <Checkbox.Group
              style={{ width: "100%" }}
              value={selectedIds}         // ถ้าจะให้ Form คุมเอง สามารถลบ value+onChange ออกได้
              onChange={handleChange}
              disabled={loading}
            >
              <Row>
                {allFacilities.map((facility) => {
                  const hasIcon = !!facility.icon && facility.icon !== "undefined";
                  return (
                    <Col span={12} key={facility.id} style={{ marginBottom: 8 }}>
                      <Checkbox value={facility.id}>
                        <span>{facility.name}</span>
                        {hasIcon && (
                          <i
                            className={`${facility.icon} icofont-2x`}
                            aria-label={facility.name}
                            style={{ marginLeft: 8, verticalAlign: "middle" }}
                          />
                        )}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
