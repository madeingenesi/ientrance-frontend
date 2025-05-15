"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// Importa BrowserRouter in modalità client-only
const BrowserRouter = dynamic(
  () => import("react-router-dom").then((mod) => mod.BrowserRouter),
  { ssr: false }
);

// Context
import { useEquipments } from "@/context/EquimentContext";

// UI
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons
import { Check, ChevronsUpDown, Search, X, ArrowUpRight } from "lucide-react";
import { SelectPopover } from "./SelectPopover";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Equipment } from "@/helpers/types";

export default function Catalogue() {
  const { machineries } = useEquipments();
  const [search, setSearch] = useState("");
  const [filteredMachineries, setFilteredMachineries] =
    useState<Equipment[]>(machineries);
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

  useEffect(() => {
    const uniqueMainCategory = new Set(
      filteredMachineries.map(
        (machine: any) => machine.techniqueName?.split(">", 2)[0]
      )
    );
    const uniqueTechnique = new Set(
      filteredMachineries.map(
        (machine: any) => machine.techniqueName?.split(">", 2)[1]
      )
    );
    const uniqueTenantName = new Set(
      filteredMachineries.map((machine: any) => machine.tenantName)
    );

    setMainCategory(
      [...(uniqueMainCategory as unknown as string[])].filter(Boolean).sort()
    );
    setTechnique(
      [...(uniqueTechnique as unknown as string[])].filter(Boolean).sort()
    );
    setTenantName(
      [...(uniqueTenantName as unknown as string[])].filter(Boolean).sort()
    );
  }, [filteredMachineries]);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = machineries.filter((machine: any) => {
      // Escludi solo le macchine offline
      if (machine.equipmentStatus === "Offline") return false;
      const matchesSearch =
        machine.techniqueName?.toLowerCase().includes(lowercasedSearch) ||
        machine.tenantName?.toLowerCase().includes(lowercasedSearch) ||
        machine.productModel?.toLowerCase().includes(lowercasedSearch);
      const matchesFilterFields = filterFields.every(
        (field) =>
          machine.techniqueName?.toLowerCase().includes(field.toLowerCase()) ||
          machine.tenantName?.toLowerCase().includes(field.toLowerCase()) ||
          machine.productModel?.toLowerCase().includes(field.toLowerCase())
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
          {/* Il wrapper BrowserRouter viene caricato solo sul client */}
          <BrowserRouter>
            <DynamicBreadcrumb />
          </BrowserRouter>
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
              {filterFields.length > 0 || search
                ? filteredMachineries.length
                : machineries.length}{" "}
              machines
            </Badge>
            <Badge
              variant="outline"
              className="text-sm bg-sidebar text-gray-500 rounded-full"
            >
              {technique.length} techniques
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
              filterName="Tenant Name"
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
              {filteredMachineries.map((machine: any) => (
                <TableRow
                  key={machine.id}
                  className="cursor-pointer hover:bg-gray-100 divide-x *:p-4 *:text-xs md:*:text-sm"
                  onClick={() => {
                    setSelectedItem({
                      description: machine?.description,
                      id: machine?.id,
                      tenantName: machine?.tenantName,
                      name: machine?.name,
                      mainCategory: machine?.techniqueName?.split(">", 2)[0],
                      technique: machine?.techniqueName?.split(">", 2)[1],
                      model: machine?.productModel,
                      node: machine?.tenantName,
                      laboratory: machine?.equipmentLaboratoryName,
                    });
                    setOpen(true);
                  }}
                >
                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.techniqueName?.split(">", 2)[0] || "Null"}
                  </TableCell>
                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.techniqueName?.split(">", 2)[1] || "Null"}
                  </TableCell>
                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.name || "Null"}
                  </TableCell>
                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.tenantName || "Null"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredMachineries.length === 0 && (
            <div className="container w-full max-w-7xl mx-auto flex flex-col gap-2 p-4 border border-t-0 overflow-hidden">
              <p className="text-center text-gray-500">No machines found</p>
            </div>
          )}
        </section>
      </main>

      {/* Sheet di dettaglio */}
      <Sheet open={open} onOpenChange={setOpen}>
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
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              {selectedItem && (
                <div className="divide-y last:border-b">
                  {Object.entries(selectedItem)
                    .filter(
                      ([key]) =>
                        !["id", "technique", "laboratory"].includes(key)
                    )
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-12 divide-x text-sm"
                      >
                        <h4 className="col-span-4 p-4">{key}</h4>
                        <p className="col-span-8 p-4">{value as string}</p>
                      </div>
                    ))}
                </div>
              )}
            </ScrollArea>
          </div>
          <SheetFooter className="border-t p-0">
            <SheetClose asChild>
              <Button
                type="submit"
                className="w-full bg-black rounded-none p-6 text-lg font-light"
              >
                Close Details
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
