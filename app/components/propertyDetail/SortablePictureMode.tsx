"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Image } from "antd";
import { App as AntdApp } from "antd";
import { getPropertyPictures, updatePropertySortIndex } from "@/app/server_actions/property"; 

type SelectedProperty = {
     propertyId?: number;
  };  
type PictureItem = {
    id: string;
    guId: string;
    url?: string;
    token: string;
}
type SortablePictureItem = {
    id: string;
    guId: string;
    url?: string;
}
type ItemsId = {
    id: string;
}
const SortableItem = ({ id, guId, url }: PictureItem) => { 
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Use preview if available, otherwise fallback to filename
  const imageSrc = `https://servesystem.s3.ap-southeast-1.amazonaws.com/${url}`;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        padding: "8px",
        marginBottom: "8px",
        borderRadius: "4px",
        backgroundColor: "white",
        touchAction: "none",
      }}
      {...attributes}
      {...listeners}
    >
      <Image  src={imageSrc} alt={guId} width={60} height={60} style={{ marginRight: "12px", objectFit: "cover" }} />
      <span className="text-sm p-4" style={{ color: "#000000", cursor: "pointer" }}>{guId}</span>
    </div>
  );
};

export const SortablePictureMode = ({ selectedProperty, token, onSorted }: { selectedProperty: SelectedProperty, token: string, onSorted: () => void }) => {
  const [items, setItems] = useState<PictureItem[]>([]);
  const [itemsId, setItemsId] = useState<ItemsId[]>([]);
  const { message } = AntdApp.useApp();
  useEffect(() => {
    getPropertyPictures(selectedProperty.propertyId as number, token).then((response) => {
      setItems(response.map((item: SortablePictureItem) => ({
        id: item.id,
        guId: item.guId,
        url: item.url,
      })));
      setItemsId(response.map((item: SortablePictureItem) => ({id: item.id})));
    });
  }, [selectedProperty.propertyId, token]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
  
    const newItems = arrayMove(items, oldIndex, newIndex);
    const newItemsId = arrayMove(itemsId, oldIndex, newIndex);
  
    setItems(newItems);
    setItemsId(newItemsId);
  
    // ส่งค่าใหม่ไปเลย ไม่ต้องพึ่ง state
    await handleUpdateSortIndex(newItemsId);
  };
  
  

const handleUpdateSortIndex = async (newItemsId: ItemsId[]) => {
  try {
    console.log("newItemsId in handleUpdateSortIndex client",newItemsId);
    const response = await updatePropertySortIndex(token, newItemsId); 
    console.log("response", response);

    message.success("อัพเดตลำดับภาพสำเร็จ");
    onSorted();
    
  } catch (error) {
    console.error("update failed:", error);
    message.error("อัพเดตลำดับภาพไม่สำเร็จ");
  }
};

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} guId={item.guId} url={item.url} token={item.token} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
