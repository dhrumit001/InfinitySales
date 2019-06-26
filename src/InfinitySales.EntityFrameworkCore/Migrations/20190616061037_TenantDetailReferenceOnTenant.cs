using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InfinitySales.Migrations
{
    public partial class TenantDetailReferenceOnTenant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropIndex(
            //    name: "IX_TenantDetails_TenantId",
            //    table: "TenantDetails");

            //migrationBuilder.DropColumn(
            //    name: "EventId",
            //    table: "TenantDetails");

            //migrationBuilder.AddColumn<int>(
            //    name: "TenantId",
            //    table: "AbpTenants",
            //    nullable: true);

            //migrationBuilder.CreateIndex(
            //    name: "IX_TenantDetails_TenantId",
            //    table: "TenantDetails",
            //    column: "TenantId",
            //    unique: true);

            //migrationBuilder.CreateIndex(
            //    name: "IX_AbpTenants_TenantId",
            //    table: "AbpTenants",
            //    column: "TenantId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_AbpTenants_TenantDetails_TenantId",
            //    table: "AbpTenants",
            //    column: "TenantId",
            //    principalTable: "TenantDetails",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AbpTenants_TenantDetails_TenantId",
                table: "AbpTenants");

            migrationBuilder.DropIndex(
                name: "IX_TenantDetails_TenantId",
                table: "TenantDetails");

            migrationBuilder.DropIndex(
                name: "IX_AbpTenants_TenantId",
                table: "AbpTenants");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "AbpTenants");

            migrationBuilder.AddColumn<Guid>(
                name: "EventId",
                table: "TenantDetails",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TenantDetails_TenantId",
                table: "TenantDetails",
                column: "TenantId");
        }
    }
}
