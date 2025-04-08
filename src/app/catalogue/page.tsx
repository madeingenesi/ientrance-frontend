"use client";

import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

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

//Icons
import { Check, ChevronsUpDown, Search, X, ArrowUpRight } from "lucide-react";
import { SelectPopover } from "./SelectPopover";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Equipment } from "@/helpers/types";

export default function Catalogue() {
  const { equipments } = useEquipments();
  const { machineries } = useEquipments();
  const [search, setSearch] = useState("");
  const [filteredMachineries, setFilteredMachineries] =
    useState<Equipment[]>(machineries);
  const [mainCategory, setMainCategory] = useState([
    "Caracterization",
    "Fabrication",
  ]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [technique, setTechnique] = useState<string[]>([]);
  const [tenantName, setTenantName] = useState<string[]>([]);
  const [model, setModel] = useState<string[]>([]);
  const [node, setNode] = useState<string[]>([]);
  const [state, setState] = useState<string[]>([]);

  const [filterFields, setFilterFields] = useState<string[]>([]);

  // Gestione dello Sheet
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const uniqueMainCategory = new Set(
      filteredMachineries.map(
        (machine: any) => machine.techniqueName?.split(">")[0]
      )
    );
    const uniqueSubCategory = new Set(
      filteredMachineries.map(
        (machine: any) => machine.techniqueName?.split(">")[1]
      )
    );
    const uniqueTechnique = new Set(
      filteredMachineries.map(
        (machine: any) => machine.techniqueName?.split(">")[2]
      )
    );
    const uniqueTenantName = new Set(
      filteredMachineries.map((machine: any) => machine.tenantName)
    );

    setMainCategory(
      [...(uniqueMainCategory as unknown as string[])].filter(Boolean)
    );
    setSubCategory(
      [...(uniqueSubCategory as unknown as string[])].filter(Boolean)
    );
    setTechnique([...(uniqueTechnique as unknown as string[])].filter(Boolean));
    setTenantName(
      [...(uniqueTenantName as unknown as string[])].filter(Boolean)
    );
  }, [filteredMachineries]);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = machineries.filter((machine: any) => {
      const matchesSearch =
        machine.techniqueName?.toLowerCase().includes(lowercasedSearch) ||
        machine.tenantName?.toLowerCase().includes(lowercasedSearch) ||
        machine.productModel?.toLowerCase().includes(lowercasedSearch) ||
        machine.equipmentStatus?.toLowerCase().includes(lowercasedSearch);
      const matchesFilterFields = filterFields.every(
        (field) =>
          machine.techniqueName?.toLowerCase().includes(field.toLowerCase()) ||
          machine.tenantName?.toLowerCase().includes(field.toLowerCase()) ||
          machine.productModel?.toLowerCase().includes(field.toLowerCase()) ||
          machine.equipmentStatus?.toLowerCase().includes(field.toLowerCase())
      );
      return matchesSearch && matchesFilterFields;
    });
    setFilteredMachineries(filtered);
  }, [search, machineries, filterFields]);

  const removeTerm = (field: string) => {
    setFilterFields(filterFields.filter((f) => f !== field));
    console.log(filterFields);
  };

  const handleFilter = (value: string) => {
    // Your filter logic
  };

  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="w-full border-b p-4 px-8">
          <Router>
            <DynamicBreadcrumb />
          </Router>
        </div>
        <div className="container w-full mx-auto flex flex-col gap-2 p-8 border border-t-0">
          <h1 className="text-5xl font-medium tracking-tight">Catalogue</h1>
          <div className="flex gap-2 mt-4">
            <Badge
              variant="outline"
              className="text-sm bg-sidebar text-gray-500 rounded-full"
            >
              {machineries.length} machines
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
      <main className="container w-full mx-auto flex flex-col">
        <div className="container w-full mx-auto sticky top-0 bg-white z-10">
          <div className="grid grid-cols-5 gap-0 border border-t-0 divide-x divide-gray-200">
            <SelectPopover
              values={mainCategory}
              filterFields={filterFields}
              setFilterFields={setFilterFields}
              filterName="Main Category"
            />
            <SelectPopover
              values={subCategory}
              filterFields={filterFields}
              setFilterFields={setFilterFields}
              filterName="Sub Category"
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

            <div className="relative">
              <Input
                placeholder="Search"
                className="rounded-none border-0 shadow-none py-6 bg-sidebar"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute right-0 top-0 h-full p-6" />
            </div>
          </div>
          {filterFields.length > 0 && (
            <div className="container w-full max-w-7xl mx-auto flex gap-2 p-4 border border-t-0 overflow-hidden">
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

        <section className="border mt-12">
          <Table>
            <TableHeader>
              <TableRow className="*:p-4 divide-x">
                <TableHead>Main Category</TableHead>
                <TableHead>Sub Category</TableHead>
                <TableHead>Technique</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Node</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {filteredMachineries.map((machine: any) => (
                <TableRow
                  key={machine.id}
                  className="cursor-pointer hover:bg-gray-100 divide-x *:p-4 *:text-sm"
                  onClick={() => {
                    setSelectedItem({
                      description: machine?.description,
                      id: machine?.id,
                      tenantName: machine?.tenantName,
                      name: machine?.name,
                      mainCategory: machine?.techniqueName?.split(">")[0],
                      subCategory: machine?.techniqueName?.split(">")[1],
                      technique: machine?.techniqueName?.split(">")[2],
                      model: machine?.productModel,
                      state: machine?.equipmentStatus,
                      node: machine?.tenantName,
                      laboratory: machine?.equipmentLaboratoryName,
                    });
                    setOpen(true);
                  }}
                >
                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.techniqueName?.split(">")[0] || "Null"}
                  </TableCell>
                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.techniqueName?.split(">")[1] || "Null"}
                  </TableCell>
                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.techniqueName?.split(">")[2] || "Null"}
                  </TableCell>
                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.name || "Null"}
                  </TableCell>

                  <TableCell className="col-span-1 text-wrap whitespace-normal">
                    {machine.tenantName || "Null"}
                  </TableCell>
                  <TableCell
                    className={`col-span-1 text-wrap whitespace-normal`}
                  >
                    <Badge
                      className={`rounded-full ${
                        machine.equipmentStatus === "Online"
                          ? "bg-green-100 text-green-500 border-green-500"
                          : "bg-red-100 text-red-500 border-red-500"
                      }`}
                    >
                      {machine.equipmentStatus || "Null"}
                    </Badge>
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
              <h3 className="text-2xl font-medium">{selectedItem?.name} </h3>
              <Badge
                className={`rounded-full ${
                  selectedItem?.state === "Online"
                    ? "bg-green-100 text-green-500 border-green-500"
                    : "bg-red-100 text-red-500 border-red-500"
                }`}
              >
                {selectedItem?.state || "Null"}
              </Badge>
            </div>
            <div className="flex flex-row border-t divide-x">
              <div className="w-3/4 p-4 font-semibold">
                Technique: {selectedItem?.technique}
              </div>
              <div className="w-1/4 p-4 bg-foreground text-white flex flex-row gap-2 items-center justify-between">
                Discover more <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              {selectedItem && (
                <div className="divide-y">
                  {Object.entries(selectedItem)
                    .filter(
                      ([key]) => !["id", "state", "technique"].includes(key)
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

          <SheetFooter className="border-t">
            <SheetClose asChild>
              <Button type="submit">More Details</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
