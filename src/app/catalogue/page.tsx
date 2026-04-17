"use client";

import { useState, useEffect } from "react";

// Context
import { useEquipments } from "@/context/EquimentContext";

// UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  EquipmentRequestForm,
  NODE_TO_EMAIL,
} from "@/components/EquipmentRequestForm";

// Icons
import { Check, ChevronsUpDown, Search, X, ArrowUpRight } from "lucide-react";
import { SelectPopover } from "./SelectPopover";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import {
  type CatalogEquipment,
  collectMainCategories,
  collectTechniqueLabels,
  getEquipmentMainCategory,
  getEquipmentSearchHaystack,
  getEquipmentTechniqueLabel,
} from "@/helpers/catalogEquipment";
import { mergeRecipientEmails } from "@/helpers/parseEquipmentMainContactEmails";

const CATALOG_TABLE_SKELETON_ROWS = 10;

export default function Catalogue() {
  const { machineries, loading, error } = useEquipments();
  const [search, setSearch] = useState("");
  const [filteredMachineries, setFilteredMachineries] = useState<
    CatalogEquipment[]
  >(machineries as CatalogEquipment[]);
  const [mainCategory, setMainCategory] = useState([
    "Caracterization",
    "Fabrication",
  ]);
  const [technique, setTechnique] = useState<string[]>([]);
  const [tenantName, setTenantName] = useState<string[]>([]);
  const [model, setModel] = useState<string[]>([]);
  const [node, setNode] = useState<string[]>([]);
  const [filterFields, setFilterFields] = useState<string[]>([]);

  // Gestione dello Sheet
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    const uniqueMainCategory = new Set(
      filteredMachineries.flatMap((machine) =>
        collectMainCategories(machine)
      )
    );
    const uniqueTechnique = new Set(
      filteredMachineries.flatMap((machine) =>
        collectTechniqueLabels(machine)
      )
    );
    const uniqueTenantName = new Set(
      filteredMachineries
        .map((machine) => machine.tenantName)
        .filter((t): t is string => typeof t === "string" && t.length > 0)
    );

    setMainCategory([...uniqueMainCategory].filter(Boolean).sort());
    setTechnique([...uniqueTechnique].filter(Boolean).sort());
    setTenantName([...uniqueTenantName].sort());
  }, [filteredMachineries]);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const list = (machineries || []) as CatalogEquipment[];
    const filtered = list.filter((machine) => {
      if (machine.equipmentStatus === "Offline") return false;
      const hay = getEquipmentSearchHaystack(machine);
      const matchesSearch =
        !lowercasedSearch || hay.includes(lowercasedSearch);
      const matchesFilterFields = filterFields.every((field) =>
        hay.includes(field.toLowerCase())
      );
      return matchesSearch && matchesFilterFields;
    });
    setFilteredMachineries(filtered);
  }, [search, machineries, filterFields]);

  const removeTerm = (field: string) => {
    setFilterFields(filterFields.filter((f) => f !== field));
  };

  const handleFilter = (value: string) => {
    // Implementa la logica di filtraggio se necessario
  };

  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="w-full border-b p-4 px-8">
          <DynamicBreadcrumb />
        </div>
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            Catalogue
          </h1>
          <div className="flex gap-2 mt-4">
            <Badge
              variant="outline"
              className="text-sm bg-sidebar text-gray-500 rounded-full"
            >
              {loading
                ? "…"
                : error
                  ? "—"
                  : filterFields.length > 0 || search
                    ? filteredMachineries.length
                    : machineries.length}{" "}
              machines
            </Badge>
            <Badge
              variant="outline"
              className="text-sm bg-sidebar text-gray-500 rounded-full"
            >
              {loading ? "…" : error ? "—" : technique.length} techniques
            </Badge>
          </div>
        </div>
      </header>
      <main className="container w-full mx-auto flex flex-col mb-12">
        <div className="container w-full mx-auto sticky top-0 bg-white z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 !divide-y md:border md:border-t-0 md:!divide-y-0 md:divide-x divide-gray-200">
            <SelectPopover
              values={mainCategory}
              filterFields={filterFields}
              setFilterFields={setFilterFields}
              filterName="Main Category"
            />
            <SelectPopover
              values={technique}
              filterFields={filterFields}
              setFilterFields={setFilterFields}
              filterName="Technique"
            />
            <SelectPopover
              values={tenantName}
              filterFields={filterFields}
              setFilterFields={setFilterFields}
              filterName="Nodes"
            />
            <div className="relative border-b md:border-b-0">
              <Input
                placeholder="Search"
                className="rounded-none border-0 shadow-none py-6 bg-sidebar"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute right-0 top-0 h-full p-6" />
            </div>
          </div>
          {filterFields.length > 0 && (
            <div className="container w-full mx-auto flex gap-2 p-4 border-b md:border md:border-t-0 overflow-scroll md:overflow-hidden">
              {filterFields.map((field) => (
                <Badge
                  key={field}
                  className="rounded-full bg-gray-200 text-black hover:bg-red-100 hover:text-red-500 hover:border-red-500 cursor-pointer"
                  onClick={() => removeTerm(field)}
                >
                  {field}
                  <X className="w-4 h-4" />
                </Badge>
              ))}
            </div>
          )}
        </div>
        {error && !loading && (
          <div
            className="mt-6 rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            We could not load the catalogue. Please try again later.
            <span className="sr-only"> {error}</span>
          </div>
        )}
        {/* Sezione tabella */}
        <section className="border mt-12">
          <Table>
            <TableHeader>
              <TableRow className="*:p-4 divide-x">
                <TableHead>Main Category</TableHead>
                <TableHead>Technique</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Node</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {loading
                ? Array.from({ length: CATALOG_TABLE_SKELETON_ROWS }, (_, i) => (
                    <TableRow
                      key={`catalog-skeleton-${i}`}
                      className="divide-x *:p-4 *:text-xs md:*:text-sm"
                      aria-hidden
                    >
                      <TableCell>
                        <Skeleton className="h-4 w-[min(100%,8rem)]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[min(100%,14rem)]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[min(100%,14rem)]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[min(100%,10rem)]" />
                      </TableCell>
                    </TableRow>
                  ))
                : filteredMachineries.map((machine) => (
                    <TableRow
                      key={machine.id}
                      className="cursor-pointer hover:bg-gray-100 divide-x *:p-4 *:text-xs md:*:text-sm"
                      onClick={() => {
                        setSelectedItem({
                          description: machine.description ?? "—",
                          id: machine.id,
                          tenantName: machine.tenantName ?? "—",
                          name: machine.name ?? "—",
                          mainCategory: getEquipmentMainCategory(machine),
                          technique: getEquipmentTechniqueLabel(machine),
                          model: machine.productModel ?? "—",
                          node: machine.tenantName ?? "—",
                          laboratory: machine.equipmentLaboratoryName ?? "—",
                          manufacturer: machine.manufacturer ?? "—",
                          equipmentMainContactInfo:
                            machine.equipmentMainContactInfo ?? null,
                        });
                        setOpen(true);
                      }}
                    >
                      <TableCell className="col-span-1 text-wrap whitespace-normal">
                        {getEquipmentMainCategory(machine)}
                      </TableCell>
                      <TableCell className="col-span-1 text-wrap whitespace-normal">
                        {getEquipmentTechniqueLabel(machine)}
                      </TableCell>
                      <TableCell className="col-span-1 text-wrap whitespace-normal">
                        {machine.name ?? "—"}
                      </TableCell>
                      <TableCell className="col-span-1 text-wrap whitespace-normal">
                        {machine.tenantName ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {!loading && !error && filteredMachineries.length === 0 && (
            <div className="container w-full max-w-7xl mx-auto flex flex-col gap-2 p-4 border border-t-0 overflow-hidden">
              <p className="text-center text-gray-500">No machines found</p>
            </div>
          )}
        </section>
      </main>

      {/* Sheet di dettaglio */}
      <Sheet
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setShowRequestForm(false);
        }}
      >
        <SheetContent className="w-full min-w-4xl gap-0 h-screen">
          <SheetHeader>
            <SheetTitle className="flex flex-row gap-2 items-center">
              Details{" "}
              <span className="text-sm text-gray-500 px-2 border rounded-lg">
                ID: #{selectedItem?.id}
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col border-y">
            <div className="flex flex-row gap-2 items-center justify-between p-4">
              <h3 className="text-2xl font-medium">{selectedItem?.name}</h3>
            </div>
            <div className="flex flex-row border-t ">
              <div className="w-3/4 p-4 font-semibold">
                Technique: {selectedItem?.technique}
              </div>
              <div className="w-1/4 p-4 bg-foreground text-white flex flex-row gap-2 items-center justify-between hidden">
                Discover more <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {showRequestForm ? (
              <EquipmentRequestForm
                onBack={() => setShowRequestForm(false)}
                onSubmit={(data) => {
                  const recipientEmail =
                    selectedItem?.tenantName &&
                    NODE_TO_EMAIL[selectedItem.tenantName];
                  mergeRecipientEmails(
                    recipientEmail || undefined,
                    selectedItem?.equipmentMainContactInfo
                  );
                  // TODO: submit request (mailto, API, etc.) using data and recipient emails
                }}
              />
            ) : (
              <ScrollArea className="h-full">
                {selectedItem && (
                  <div className="divide-y last:border-b">
                    {Object.entries(selectedItem)
                      .filter(
                        ([key]) =>
                          ![
                            "id",
                            "technique",
                            "laboratory",
                            "equipmentMainContactInfo",
                          ].includes(key)
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="grid grid-cols-12 divide-x text-sm"
                        >
                          <h4 className="col-span-4 p-4">{key}</h4>
                          <p className="col-span-8 p-4 break-words">
                            {value == null
                              ? "—"
                              : typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </ScrollArea>
            )}
          </div>
          {!showRequestForm && (
            <SheetFooter className="border-t p-0">
              <Button
                type="button"
                className="w-full bg-black rounded-none p-6 text-lg font-light text-white hover:bg-black/90"
                onClick={() => setShowRequestForm(true)}
              >
                Send Request
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
