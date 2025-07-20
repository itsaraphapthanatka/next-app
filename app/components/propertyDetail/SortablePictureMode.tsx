"use client";
import React, { useState } from "react";
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

type PictureItem = {
    id: string;
    filename: string;
    preview?: string; // Make preview optional
}

const SortableItem = ({ id, filename, preview }: PictureItem) => {
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
  const imageSrc = preview ?? filename;

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
      <Image src={imageSrc} alt={filename} width={60} height={60} style={{ marginRight: "12px", objectFit: "cover" }} />
      <span style={{ color: "#1677ff", cursor: "pointer" }}>{filename}</span>
    </div>
  );
};

export const SortablePictureMode = () => {
  const [items, setItems] = useState<PictureItem[]>([
    {
      id: "1",
      filename: "picture1.jpg",
      preview: "picture1.jpg",
    },
    {
      id: "2",
      filename: "picture2.jpg",
      preview: "picture2.jpg",
    },
    {
      id: "3",
      filename: "picture3.jpg",
      preview: "picture3.jpg",
    },
  ]);

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} filename={item.filename} preview={item.preview} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
